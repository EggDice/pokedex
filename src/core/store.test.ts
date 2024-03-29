import { map, mergeMap } from 'rxjs/operators'
import { coreMarbles } from '@core/marbles'
import { filterByType } from '@core/effect'
import {
  createCoreStore,
  createCoreStoreSlice,
  toStoreError,
  createStoreError,
  identityReducer,
} from '@core/store'
import type { CoreReducer } from '@core/store'

type CountState = number

type AppendState = string

interface TestIncrement {
  type: 'count/increment'
  payload: undefined
};

interface TestIncrementAmount {
  type: 'count/incrementAmount'
  payload: number
};

interface TestIncrementTwo {
  type: 'count/incrementTwo'
  payload: undefined
}

interface TestStart {
  type: 'count/start'
  payload: undefined
}

interface TestAppendA {
  type: 'append/appendA'
  payload: undefined
}

type AllTestEvents =
  | TestIncrement
  | TestIncrementAmount
  | TestAppendA
  | TestIncrementTwo
  | TestStart

interface AllCountState {
  count: CountState
};

interface AllTestState {
  count: CountState
  append: AppendState
};

test('store has inital state', coreMarbles(({ expect }) => {
  const initialState: CountState = 0
  const coreStore = createCoreStore<AllCountState, AllTestEvents>({
    count: (state = initialState, event: AllTestEvents) => {
      return event.type === 'count/increment' ? state + 1 : state
    },
  })
  expect(coreStore.state$).toBeObservable('0', { 0: { count: 0 } })
}))

test('store has incremented state', coreMarbles(({ expect }) => {
  const initialState: CountState = 0
  const coreStore = createCoreStore<AllCountState, AllTestEvents>({
    count: (state = initialState, event: AllTestEvents) => {
      return event.type === 'count/increment' ? state + 1 : state
    },
  })
  coreStore.send({ type: 'count/increment', payload: undefined })
  coreStore.send({ type: 'count/incrementAmount', payload: 5 })
  expect(coreStore.state$).toBeObservable('1', { 1: { count: 1 } })
}))

test('create store slice', () => {
  const initialState: CountState = 0
  const slice = createCoreStoreSlice({
    name: 'count',
    initialState,
    reducers: {
      increment: (state: CountState, _: TestIncrement) => state + 1,
      incrementAmount: (state: CountState, event: TestIncrementAmount) =>
        state + event.payload,
    },
  })
  const reducer: CoreReducer<CountState, AllTestEvents> = slice.reducer
  const event: TestIncrement = slice.eventCreators.createIncrement()
  const event2: TestIncrementAmount = slice.eventCreators.createIncrementAmount(5)
  const stateToCount = slice.stateToCount
  expect(slice.name).toBe('count')
  expect(event.type).toBe('count/increment')
  expect(event2.type).toBe('count/incrementAmount')
  expect(reducer(initialState, event)).toBe(1)
  expect(reducer(initialState, event2)).toBe(5)
  expect(stateToCount({ count: 3 })).toBe(3)
})

test('create combined store', coreMarbles(({ expect }) => {
  const countSlice = createCoreStoreSlice({
    name: 'count',
    initialState: 0,
    reducers: {
      increment: (state: CountState, _: TestIncrement) => state + 1,
      incrementAmount: (state: CountState, event: TestIncrementAmount) =>
        state + event.payload,
    },
  })
  const appendSlice = createCoreStoreSlice({
    name: 'append',
    initialState: '',
    reducers: {
      appendA: (state: AppendState, _: TestAppendA) => state + 'A',
    },
  })
  const coreStore = createCoreStore<AllTestState, AllTestEvents>({
    count: countSlice.reducer,
    append: appendSlice.reducer,
  })

  coreStore.send(countSlice.eventCreators.createIncrement())
  coreStore.send(appendSlice.eventCreators.createAppendA())
  expect(coreStore.state$).toBeObservable('1', {
    1: {
      count: 1,
      append: 'A',
    },
  })
}))

test('extending store with effects', coreMarbles(({ expect }) => {
  const initialState: CountState = 0
  const coreStore = createCoreStore<AllCountState, AllTestEvents>({
    count: (state = initialState, event: AllTestEvents) => {
      switch (event.type) {
        case 'count/incrementAmount':
          return state + event.payload
        case 'count/increment':
          return state + 1
        default:
          return state
      }
    },
  })
  coreStore.registerEffect(event$ => event$.pipe(
    filterByType('count/increment'),
    map(() => ({ type: 'count/incrementAmount', payload: 2 })),
  ))
  coreStore.send({ type: 'count/increment', payload: undefined })
  expect(coreStore.state$).toBeObservable('3', { 3: { count: 3 } })
}))

test('effect triggering another', coreMarbles(({ expect }) => {
  const initialState: CountState = 0
  const coreStore = createCoreStore<AllCountState, AllTestEvents>({
    count: (state = initialState, event: AllTestEvents) => {
      switch (event.type) {
        case 'count/incrementAmount':
          return state + event.payload
        case 'count/increment':
          return state + 1
        default:
          return state
      }
    },
  })
  coreStore.registerEffect(event$ => event$.pipe(
    filterByType('count/start'),
    map(() => ({ type: 'count/incrementTwo', payload: undefined })),
  ))
  coreStore.registerEffect(event$ => event$.pipe(
    filterByType('count/incrementTwo'),
    map(() => ({ type: 'count/incrementAmount', payload: 2 })),
  ))
  coreStore.send({ type: 'count/start', payload: undefined })
  expect(coreStore.state$).toBeObservable('2', { 2: { count: 2 } })
}))

test('effect reading the state', coreMarbles(({ expect }) => {
  const initialState: CountState = 1
  const coreStore = createCoreStore<AllCountState, AllTestEvents>({
    count: (state = initialState, event: AllTestEvents) => {
      switch (event.type) {
        case 'count/incrementAmount':
          return state + event.payload
        case 'count/increment':
          return state + 1
        default:
          return state
      }
    },
  })
  coreStore.registerEffect((event$, state$) => event$.pipe(
    filterByType('count/start'),
    mergeMap(() => state$),
    map(({ count }) => count),
    map((count) => ({ type: 'count/incrementAmount', payload: count })),
  ))
  coreStore.send({ type: 'count/start', payload: undefined })
  expect(coreStore.state$).toBeObservable('2', { 2: { count: 2 } })
}))

test('to store error', () => {
  const error = new Error('message')
  const storeError = toStoreError(error)
  expect(storeError.message).toBe('message')
  expect(storeError.stack.length > 0).toBe(true)
})

test('create store error', () => {
  const storeError = createStoreError('message')
  expect(storeError.message).toBe('message')
  expect(storeError.stack.length > 0).toBe(true)
})

test('identity reducer', () => {
  const state = { count: 1 }
  expect(identityReducer(state, { type: 'count/increment' })).toBe(state)
})
