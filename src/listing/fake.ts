import { listingReducer } from './store'
import { createStoreTools } from '@core/fake'
import { baseStore } from '@/navigation/fake'

export const {
  getStateReadable,
  createAppStore,
} = createStoreTools('listing', listingReducer, baseStore)
