import { createNavigationService } from './service'
import { createMemoryHistory } from 'history'
import { navigationReducer } from './store'
import type { NavigationState, NavigationEvent } from './store'
import { createStoreTools } from '@core/fake'

export const navigationServiceFake = createNavigationService(createMemoryHistory())

export const {
  createAppStore,
  getStateReadable,
} = createStoreTools<
NavigationState,
NavigationEvent,
'navigation'
>('navigation', navigationReducer)
