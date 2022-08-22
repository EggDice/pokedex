import { createCoreStore } from '@core/store'
import { listingReducer } from '@/listing'
import { navigationReducer } from '@/navigation'

import type { CoreStore, StateReadable, EventReceiver, EffectRegistry } from '@core/store'
import type { ListingState, ListingEvent } from '@/listing'
import type { NavigationState, NavigationEvent } from '@/navigation'

export interface AppStoreState {
  listing: ListingState
  navigation: NavigationState
}

export type AppStoreEvent =
  | ListingEvent
  | NavigationEvent

export type AppStore = CoreStore<AppStoreState, AppStoreEvent>

export type AppStateReadable = StateReadable<AppStoreState>

export type AppEventReceiver = EventReceiver<AppStoreEvent>

export type AppEffectRegistry = EffectRegistry<AppStoreEvent>

export const appStore = (): AppStore => createCoreStore<AppStoreState, AppStoreEvent>({
  listing: listingReducer,
  navigation: navigationReducer,
})
