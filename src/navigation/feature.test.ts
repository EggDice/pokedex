import { coreMarbles } from '@core/marbles'
import { createAppStore, navigationServiceFake as navigationService } from './fake'
import { createNavigation } from './feature'

test('handle app navigations', coreMarbles(({ expect }) => {
  const { store } = createAppStore()
  const { appNavigation, location$ } = createNavigation({ store, navigationService })
  appNavigation({
    pathname: '/path',
    search: 'a=1&b=2',
    hash: 'some',
  })
  expect(location$).toBeObservable('l', {
    l: {
      pathname: '/path',
      search: 'a=1&b=2',
      hash: 'some',
    },
  })
}))
