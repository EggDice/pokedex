import { map } from 'rxjs/operators'
import type { Observable } from 'rxjs'
import type { StateReadable, CoreEvent, CoreStore, CoreReducer } from './store'
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
  APP_STORE_STATE = TestAppStoreState<STATE, STATE_KEY>,
> {
  getStateReadable: (in$: Observable<Partial<STATE>>) => StateReadable<APP_STORE_STATE>
  createAppStore: () => {
    store: CoreStore<APP_STORE_STATE, EVENT>
    sliceState$: Observable<STATE>
  }
}

export const createStoreTools = <STATE, EVENT extends CoreEvent, STATE_KEY>
  (key: StringLiteral<STATE_KEY>, reducer: CoreReducer<STATE, EVENT>):
  StoreTools<STATE, EVENT, STATE_KEY> => {
      type AppStoreState = TestAppStoreState<STATE, STATE_KEY>
      return {
        getStateReadable: (in$: Observable<Partial<STATE>>): StateReadable<AppStoreState> => ({
          // We are faking a whole state so needs to force casting is needed
          state$: in$.pipe(map(x => ({ [key]: x } as unknown as AppStoreState))),
        }),
        createAppStore: () => {
          const store = createCoreStore<AppStoreState, EVENT>(
            makeObjectFromStringLiteral(key, reducer),
          )
          return {
            store,
            sliceState$: store.state$.pipe(map((state) => state[key])),
          }
        },
      }
}
