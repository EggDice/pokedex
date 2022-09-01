import { map } from 'rxjs/operators'
import { createRouter } from './router'
import type { StateReadable } from '@core/store'
import type { NavigationState } from './store'
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
    store: StateReadable<{ navigation: NavigationState }>,
    router: Router = defaultRouter,
  ): NavigationQuery => ({
    location$:
      store.state$.pipe(map(({ navigation }) => navigation)),
    route$:
      store.state$.pipe(map(({ navigation }) => router.resolve(navigation))),
  })
