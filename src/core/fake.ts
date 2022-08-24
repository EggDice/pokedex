import { map } from 'rxjs/operators'
import type { Observable } from 'rxjs'
import type { StateReadable, CoreEvent, CoreStore, CoreReducer, CoreReducersObject } from './store'
import { createCoreStore } from '@core/store'
import { makeObjectFromStringLiteral } from './util'
import { StringLiteral } from './type'

export type TestAppStoreState<STATE, STATE_KEY> = {
  [K in StringLiteral<STATE_KEY>]: STATE
}

export interface StoreTools<
  STATE,
  EVENT extends CoreEvent,
  STATE_KEY,
  BASE_STATE,
  APP_STORE_STATE = TestAppStoreState<STATE, STATE_KEY>,
> {
  getStateReadable: (in$: Observable<Partial<STATE>>) => StateReadable<APP_STORE_STATE>
  createAppStore: () => {
    store: CoreStore<APP_STORE_STATE & BASE_STATE, EVENT>
    sliceState$: Observable<STATE>
  }
}

type GetReducerObjectState<STATE> = STATE extends CoreReducersObject<infer S, any> ? S : STATE
type GetReducerState<STATE> = STATE extends CoreReducer<infer S, any> ? S : STATE
type GetReducerEvent<EVENT> = EVENT extends CoreReducer<any, infer E> ? E : EVENT

export const createStoreTools = <STATE_KEY>
  (
    key: StringLiteral<STATE_KEY>,
    reducer: CoreReducer<any, any>,
    baseStore: CoreReducersObject<any, any> = {},
  ):
  StoreTools<
  GetReducerState<typeof reducer>,
  GetReducerEvent<typeof reducer>,
  STATE_KEY,
  GetReducerObjectState<typeof baseStore>
  > => {
    type BaseState = GetReducerObjectState<typeof baseStore>
    type State = GetReducerState<typeof reducer>
    type Event = GetReducerEvent<typeof reducer>
    type AppStoreState = TestAppStoreState<State, STATE_KEY>
    return {
      getStateReadable: (in$: Observable<Partial<State>>): StateReadable<AppStoreState> => ({
        // We are faking a whole state so needs to force casting is needed
        state$: in$.pipe(map(x => ({ [key]: x } as unknown as AppStoreState))),
      }),
      createAppStore: () => {
        const store = createCoreStore<AppStoreState & BaseState, Event>({
          ...baseStore,
          ...makeObjectFromStringLiteral(key, reducer),
        })
        return {
          store,
          sliceState$: store.state$.pipe(map((state) => state[key])),
        }
      },
    }
}
