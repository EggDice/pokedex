import { createCoreStore } from '@core/store'
import { listingReducer } from '@/listing'
import { navigationReducer } from '@/navigation'

import type { CoreStore, StateReadable, EventReceiver, EffectRegistry } from '@core/store'
import type { ListingState, ListingEvent } from '@/listing'
import type { NavigationState, NavigationEvent } from '@/navigation'
import { LISTING_NAMESPACE } from '@/listing/config'
import { NAVIGATION_NAMESPACE } from '@/navigation/config'

export interface AppStoreState {
  [LISTING_NAMESPACE]: ListingState
  [NAVIGATION_NAMESPACE]: NavigationState
}

export type AppStoreEvent =
  | ListingEvent
  | NavigationEvent

export type AppStore = CoreStore<AppStoreState, AppStoreEvent>

export type AppStateReadable = StateReadable<AppStoreState>

export type AppEventReceiver = EventReceiver<AppStoreEvent>

export type AppEffectRegistry = EffectRegistry<AppStoreState, AppStoreEvent>

export const appStore = (): AppStore => createCoreStore<AppStoreState, AppStoreEvent>({
  [LISTING_NAMESPACE]: listingReducer,
  [NAVIGATION_NAMESPACE]: navigationReducer,
})
