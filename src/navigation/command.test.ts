import { navigationCommand } from './command'
import { coreMarbles } from '@core/marbles'
import { createAppStore } from './fake'

test('app navigation', coreMarbles(({ expect }) => {
  const { store, sliceState$ } = createAppStore()
  const command = navigationCommand(store)
  command.appNavigation({
    pathname: '/',
    search: 'a=1&b=1',
    hash: 'some',
  })
  expect(sliceState$).toBeObservable('n', {
    n: {
      pathname: '/',
      search: 'a=1&b=1',
      hash: 'some',
    },
  })
}))
