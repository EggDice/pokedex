import { createNavigationService } from './service'
import { createMemoryHistory } from 'history'
import { navigationReducer } from './store'
import { createStoreTools } from '@core/fake'
import type { NavigationService } from './service'
import { NAVIGATION_NAMESPACE } from './config'

export const createNavigationServiceFake = (): NavigationService =>
  createNavigationService(createMemoryHistory())

export const {
  createAppStore,
  getStateReadable,
} = createStoreTools(NAVIGATION_NAMESPACE, navigationReducer)

export const baseStore = { [NAVIGATION_NAMESPACE]: navigationReducer }
