import { navigationQuery } from './query'
import { coreMarbles } from '@core/marbles'
import { getStateReadable } from './fake'

test('location$ should give the current location', coreMarbles(({ expect, cold }) => {
  const { location$ } = navigationQuery(getStateReadable(cold('l', {
    l: {
      pathname: '/path',
      search: 'a=1&b=2',
      hash: 'some',
    },
  })))
  expect(location$).toBeObservable('l', {
    l: {
      pathname: '/path',
      search: 'a=1&b=2',
      hash: 'some',
    },
  })
}))
