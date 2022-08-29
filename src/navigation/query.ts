import { map } from 'rxjs/operators'
import { createRouter } from './router'
import type { StateReadable } from '@core/store'
import type { NavigationState } from './store'
import type { Location } from './type'
import type { Observable } from 'rxjs'
import type { Router } from './router'

export interface NavigationQuery<T> {
  location$: Observable<Location>
  route$: Observable<T>
}

type GetRouteType<T> = T extends Router<infer ROUTE> ? ROUTE : never

const defaultRouter = createRouter([])

export const navigationQuery = (store: StateReadable<{ navigation: NavigationState }>, router: Router<any> = defaultRouter):
NavigationQuery<GetRouteType<typeof router>> => ({
  location$:
    store.state$.pipe(map(({ navigation }) => navigation)),
  route$:
    store.state$.pipe(map(({ navigation }) => router.resolve(navigation))),
})
