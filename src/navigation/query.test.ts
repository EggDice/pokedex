import { navigationQuery } from './query'
import { coreMarbles } from '@core/marbles'
import { getStateReadable } from './fake'
import { createRouter } from './router'

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

test('route$ should give the current route', coreMarbles(({ expect, cold }) => {
  const router = createRouter([{
    path: '/path/:id',
    id: 'PATH',
    action: (context, { id }) => `Page id: ${id as string}`,
  }])
  const { route$ } = navigationQuery(getStateReadable(cold('l', {
    l: {
      pathname: '/path/1',
      search: 'a=1&b=2',
      hash: 'some',
    },
  })), router)
  expect(route$).toBeObservable('l', {
    l: 'Page id: 1',
  })
}))
