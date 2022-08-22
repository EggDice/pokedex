import { createNavigationService } from './service'
import { createMemoryHistory } from 'history'
import { coreMarbles } from '@core/marbles'

test('get empty location', () => {
  const navigation = createNavigationService(createMemoryHistory())
  const location = navigation.getLocation()
  expect(location).toEqual({
    pathname: '/',
    search: '',
    hash: '',
  })
})

test('parse location search', () => {
  const navigation = createNavigationService(createMemoryHistory())
  navigation.push({
    pathname: '/latest',
    search: 'a=1&b=2',
    hash: 'some',
  })
  const location = navigation.getLocation()
  expect(location).toEqual({
    pathname: '/latest',
    search: 'a=1&b=2',
    hash: 'some',
  })
})

test('location change stream', coreMarbles(({ expect, coldCall }) => {
  const navigation = createNavigationService(createMemoryHistory())
  coldCall('-l', {
    l: () => navigation.push(LATEST_LOCATION),
  })
  expect(navigation.location$).toBeObservable('-l', { l: LATEST_LOCATION })
}))

const LATEST_LOCATION = {
  pathname: '/latest',
  search: 'a=1&b=2',
  hash: 'some',
}
