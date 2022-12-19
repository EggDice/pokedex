import { map } from 'rxjs/operators'
import { createRouter } from './router'
import type { StateReadable } from '@core/store'
import { AppStoreNavigationStateSlice, stateToNavigation } from './store'
import type { Location } from './type'
import type { Observable } from 'rxjs'
import type { Router, RouteMatch } from './router'

export interface NavigationQuery {
  location$: Observable<Location>
  route$: Observable<RouteMatch | undefined>
}

const defaultRouter = createRouter([])

export const navigationQuery =
  (
    store: StateReadable<AppStoreNavigationStateSlice>,
    router: Router = defaultRouter,
  ): NavigationQuery => ({
    location$:
      store.state$.pipe(
        map(stateToNavigation),
      ),
    route$:
      store.state$.pipe(
        map(stateToNavigation),
        map((location) => router.resolve(location),
        )),
  })
