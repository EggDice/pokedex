import { map } from 'rxjs/operators'
import type { StateReadable } from '@core/store'
import type { NavigationState } from './store'
import type { Location } from './type'
import type { Observable } from 'rxjs'

export interface NavigationQuery {
  location$: Observable<Location>
}

export const navigationQuery = (store: StateReadable<{ navigation: NavigationState }>):
NavigationQuery => ({
  location$:
      store.state$.pipe(map(({ navigation }) => navigation)),
})
