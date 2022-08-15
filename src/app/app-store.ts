import { createCoreStore } from '@core/store'
import { listingReducer } from '@/listing'

import type { CoreStore, StateReadable, EventReceiver, EffectRegistry } from '@core/store'
import type { ListingState, ListingEvent } from '@/listing'

export interface AppStoreState {
  listing: ListingState
}

export type AppStoreEvent =
  | ListingEvent

export type AppStore = CoreStore<AppStoreState, AppStoreEvent>

export type AppStateReadable = StateReadable<AppStoreState>

export type AppEventReceiver = EventReceiver<AppStoreEvent>

export type AppEffectRegistry = EffectRegistry<AppStoreEvent>

export const appStore = (): AppStore => createCoreStore<AppStoreState, AppStoreEvent>({
  listing: listingReducer,
})
