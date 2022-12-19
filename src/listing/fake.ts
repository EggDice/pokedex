import { listingReducer } from './store'
import { createStoreTools } from '@core/fake'
import { baseStore } from '@/navigation/fake'
import { LISTING_NAMESPACE } from './config'

export const {
  getStateReadable,
  createAppStore,
} = createStoreTools(LISTING_NAMESPACE, listingReducer, baseStore)
