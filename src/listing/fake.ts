import { listingReducer } from './store'
import type { ListingState, ListingEvent } from './store'
import { createStoreTools } from '@core/fake'

export const {
  getStateReadable,
  createAppStore,
} = createStoreTools<ListingState, ListingEvent, 'listing'>('listing', listingReducer)
