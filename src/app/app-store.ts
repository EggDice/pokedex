import { createCoreStore } from '@core/store'
import { listingSlice } from '@/listing'

import type { CoreStore } from '@core/store'
import type { ListingState, ListingEvent } from '@/listing'

export interface AppStoreState {
  listing: ListingState
}

export type AppStoreEvent =
  | ListingEvent

export type AppStore = CoreStore<AppStoreState, AppStoreEvent>

export const appStore = (): AppStore => createCoreStore<AppStoreState, AppStoreEvent>({
  listing: listingSlice.reducer,
})
