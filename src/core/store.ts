import { Observable, Subject } from 'rxjs'
import { mergeAll } from 'rxjs/operators'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import type { SliceCaseReducers } from '@reduxjs/toolkit'
import type { CoreEffectFunction } from './effect'

export interface CoreStore<ALL_STATE, ALL_EVENT extends CoreEvent> extends
  StateReadable<ALL_STATE>,
  EventReceiver<ALL_EVENT>,
  EffectRegistry<ALL_STATE, ALL_EVENT> {}

export interface StateReadable<ALL_STATE> {
  state$: Observable<ALL_STATE>
}

export interface EventReceiver<ALL_EVENT extends CoreEvent> {
  send: (event: ALL_EVENT) => void
}

export interface EffectRegistry<ALL_STATE, ALL_EVENT extends CoreEvent> {
  registerEffect: (effect: CoreEffectFunction<ALL_STATE, ALL_EVENT>) => void
}

export type CoreReducer<STATE, EVENT extends CoreEvent = CoreEvent> = (
  state: STATE | undefined,
  event: EVENT
) => STATE

export type CoreReducersObject<ALL_STATE, ALL_EVENT extends CoreEvent> = {
  [KEY in keyof ALL_STATE]: CoreReducer<ALL_STATE[KEY], ALL_EVENT>;
}

export interface StoreEvent<TYPE = any> {
  type: TYPE
}

export interface PayloadStoreEvent<
  TYPE = any,
  PAYLOAD = any,
> extends StoreEvent<TYPE> {
  payload: PAYLOAD
}

export type CoreEvent = StoreEvent | PayloadStoreEvent

export type CoreCaseReducer<
  STATE,
  EVENT extends StoreEvent = StoreEvent,
> = (
  state: STATE,
  event: EVENT
) => STATE

export interface CoreCaseReducersObject<STATE> {
  [KEY: string]: CoreCaseReducer<STATE, StoreEvent>
  | CoreCaseReducer<STATE, PayloadStoreEvent>
}

export interface CoreStoreConfig<
  STATE,
  CASE_REDUCERS extends CoreCaseReducersObject<STATE>,
> {
  name: string
  initialState: STATE
  reducers: CASE_REDUCERS
};

export type StoreEventCreator<EVENT> =
  EVENT extends { type: infer TYPE, payload: infer PAYLOAD } ?
      (payload: PAYLOAD) => PayloadStoreEvent<TYPE, PAYLOAD> :
      () => EVENT

export type StoreEventCreators<
  STATE,
  CASE_REDUCERS extends CoreCaseReducersObject<STATE>,
> = {
  [KEY in keyof CASE_REDUCERS]:
  CASE_REDUCERS[KEY] extends (state: any, event: infer EVENT) => any ?
    StoreEventCreator<EVENT> :
    StoreEventCreator<CoreEvent>
}

export interface CoreStoreSlice<
  STATE,
  CASE_REDUCERS extends CoreCaseReducersObject<STATE>,
> {
  name: string
  reducer: CoreReducer<STATE>
  eventCreators: StoreEventCreators<STATE, CASE_REDUCERS>
};

export interface StoreError {
  message: string
  stack: string
}

export const createCoreStore = <
  STATE,
  EVENT extends StoreEvent | PayloadStoreEvent,
> (reducer: CoreReducersObject<STATE, EVENT>): CoreStore<STATE, EVENT> => {
  const store = configureStore({ reducer })
  const event$ = new Subject<EVENT>()
  const event$$ = new Subject<Observable<EVENT>>()
  const eventAfterEffects$ = new Subject<EVENT>()
  event$$.pipe(mergeAll()).subscribe((event) => {
    store.dispatch(event)
    eventAfterEffects$.next(event)
  })
  event$$.next(event$)
  const state$: Observable<STATE> = new Observable(subscriber => {
    subscriber.next(store.getState())
    store.subscribe(() => {
      subscriber.next(store.getState())
    })
  })
  const send = (action: EVENT): void => {
    event$.next(action)
  }
  const registerEffect = (effect: CoreEffectFunction<STATE, EVENT>): void => {
    event$$.next(effect(eventAfterEffects$, state$))
  }
  return {
    state$,
    send,
    registerEffect,
  }
}

export const createCoreStoreSlice = <
  STATE,
  CASE_REDUCERS extends CoreCaseReducersObject<STATE>,
> (config: CoreStoreConfig<STATE, CASE_REDUCERS>):
  CoreStoreSlice<STATE, CASE_REDUCERS> => {
  const {
    name,
    reducer,
    actions,
  } = createSlice({
    name: config.name,
    initialState: config.initialState,
    reducers: config.reducers as SliceCaseReducers<STATE>,
  })
  return {
    name,
    reducer: reducer as CoreReducer<STATE, CoreEvent>,
    // We don't want to reproduce the "immer" types that are used in redux-toolkit so we just
    // force cast the event creators
    eventCreators: actions as
        unknown as StoreEventCreators<STATE, CASE_REDUCERS>,
  }
}

export const toStoreError = ({ message, stack = '' }: Error): StoreError => ({
  message,
  stack,
})

export const createStoreError = (message: string): StoreError => toStoreError(new Error(message))
