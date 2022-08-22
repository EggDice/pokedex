import { navigationEffect } from './effect'
import { coreMarbles } from '@core/marbles'
import { navigationServiceFake as navigationService } from './fake'

test('site navigation', coreMarbles(({ expect, cold }) => {
  const LOCATION = {
    pathname: '/hello',
    search: 'a=1&b=2',
    hash: 'some',
  }
  const SITE_NAVIGATION = { type: 'navigation/appNavigation' as const, payload: LOCATION }
  const CHANGE_LOCATION = { type: 'navigation/changeLocation' as const, payload: LOCATION }
  const effect = navigationEffect(navigationService)
  const event$ = cold('s', { s: SITE_NAVIGATION })
  expect(effect.handleAppNavigation(event$)).toBeObservable('p', { p: CHANGE_LOCATION })
  expect(navigationService.location$).toBeObservable('l', { l: LOCATION })
}))
