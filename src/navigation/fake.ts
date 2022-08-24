import { createNavigationService } from './service'
import { createMemoryHistory } from 'history'
import { navigationReducer } from './store'
import { createStoreTools } from '@core/fake'
import type { NavigationService } from './service'

export const createNavigationServiceFake = (): NavigationService =>
  createNavigationService(createMemoryHistory())

export const {
  createAppStore,
  getStateReadable,
} = createStoreTools('navigation', navigationReducer)

export const baseStore = { navigation: navigationReducer }
