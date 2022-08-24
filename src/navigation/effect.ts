import { of } from 'rxjs'
import { map, tap, switchMap } from 'rxjs/operators'
import { changeLocationCreator } from './store'
import type { NavigationEvent } from './store'
import type { NavigationService } from './service'
import { filterByType } from '@core/effect'
import type { CoreEffectFunction } from '@core/effect'
import type { CoreEvent } from '@core/store'

interface NavigationEffect<APP_STORE_EVENT extends CoreEvent> {
  handleAppNavigation: CoreEffectFunction<APP_STORE_EVENT>
  handlePlatformNavigation: CoreEffectFunction<APP_STORE_EVENT>
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

    const handlePlatformNavigation: CoreEffectFunction<NavigationEvent> = (event$) =>
      navigationService.location$.pipe(
        switchMap((location) => of(
          {
            type: 'navigation/platformNavigation',
            payload: location,
          },
          changeLocationCreator(location),
        )),
      )

    return {
      handleAppNavigation,
      handlePlatformNavigation,
    }
  }
