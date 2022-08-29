import { navigationQuery } from './query'
import { navigationCommand } from './command'
import { navigationEffect } from './effect'
import { createRouter } from './router'
import type { NavigationQuery } from './query'
import type { NavigationCommand } from './command'
import type { NavigationState, NavigationEvent } from './store'
import type { NavigationService } from './service'
import type { CoreStore, CoreEvent } from '@core/store'
import type { Router } from './router'

interface NavigationFeatureArgs<APP_STORE_EVENT extends CoreEvent> {
  store: CoreStore<{ navigation: NavigationState }, APP_STORE_EVENT>
  navigationService: NavigationService
  router?: Router<any>
}

type GetRouteType<T> = T extends Router<infer ROUTE> ? ROUTE : never

export interface NavigationFeature<T> extends NavigationQuery<T>, NavigationCommand {}

export const createNavigation = <APP_STORE_EVENT extends CoreEvent>
  ({ store, navigationService, router = createRouter([]) }: NavigationFeatureArgs<APP_STORE_EVENT | NavigationEvent>):
  NavigationFeature<GetRouteType<typeof router>> => {
  const query = navigationQuery(store)
  const command = navigationCommand(store)
  const {
    handleAppNavigation,
    handlePlatformNavigation,
  } = navigationEffect(navigationService)

  store.registerEffect(handleAppNavigation)
  store.registerEffect(handlePlatformNavigation)

  return {
    ...command,
    ...query,
  }
}
