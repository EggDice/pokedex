import { navigationEffect } from './effect'
import { coreMarbles } from '@core/marbles'
import { createNavigationServiceFake as createNavigationService } from './fake'

test('app navigation', coreMarbles(({ expect, cold }) => {
  const LOCATION = {
    pathname: '/hello',
    search: 'a=1&b=2',
    hash: 'some',
  }
  const APP_NAVIGATION = { type: 'navigation/appNavigation' as const, payload: LOCATION }
  const CHANGE_LOCATION = { type: 'navigation/changeLocation' as const, payload: LOCATION }
  const navigationService = createNavigationService()
  const effect = navigationEffect(navigationService)
  const event$ = cold('-s', { s: APP_NAVIGATION })
  expect(effect.handleAppNavigation(event$)).toBeObservable('-p', { p: CHANGE_LOCATION })
  expect(navigationService.location$).toBeObservable('01', {
    0: DEFAULT_LOCATION,
    1: LOCATION,
  })
}))

test('platform navigation', coreMarbles(({ expect, coldCall, cold }) => {
  const LOCATION = {
    pathname: '/',
    search: '',
    hash: '',
  }
  const PLATFORM_NAVIGATION = { type: 'navigation/platformNavigation' as const, payload: LOCATION }
  const CHANGE_LOCATION = { type: 'navigation/changeLocation' as const, payload: LOCATION }
  const navigationService = createNavigationService()
  const effect = navigationEffect(navigationService)
  expect(effect.handlePlatformNavigation(cold('', {}))).toBeObservable('(pc)', {
    p: PLATFORM_NAVIGATION,
    c: CHANGE_LOCATION,
  })
}))

const DEFAULT_LOCATION = {
  pathname: '/',
  search: '',
  hash: '',
}
