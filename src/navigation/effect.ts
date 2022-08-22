import { map, tap } from 'rxjs/operators'
import { changeLocationCreator } from './store'
import type { NavigationEvent } from './store'
import type { NavigationService } from './service'
import { filterByType } from '@core/effect'
import type { CoreEffectFunction } from '@core/effect'
import type { CoreEvent } from '@core/store'

interface NavigationEffect<APP_STORE_EVENT extends CoreEvent> {
  handleAppNavigation: CoreEffectFunction<APP_STORE_EVENT>
}

export const navigationEffect =
  <
    APP_STORE_EVENT extends NavigationEvent,
  > (navigationService: NavigationService): NavigationEffect<APP_STORE_EVENT | NavigationEvent> => {
    const handleAppNavigation: CoreEffectFunction<NavigationEvent> = (event$) =>
      event$.pipe(
        filterByType('navigation/appNavigation'),
        tap(({ payload }) => navigationService.push(payload)),
        map(({ payload }) => changeLocationCreator(payload)),
      )

    return {
      handleAppNavigation,
    }
  }
