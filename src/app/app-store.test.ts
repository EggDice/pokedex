import { appStore } from './app-store'
import { coreMarbles } from '@core/marbles'
import { map } from 'rxjs/operators'

test('Should have listing', coreMarbles(({ expect }) => {
  const store = appStore()
  const keys$ = store.state$.pipe(map((state) =>
    Object.keys(state).filter((key) => key === 'listing')))
  expect(keys$).toBeObservable('s', { s: ['listing'] })
}))

test('Should have navigation', coreMarbles(({ expect }) => {
  const store = appStore()
  const keys$ = store.state$.pipe(map((state) =>
    Object.keys(state).filter((key) => key === 'navigation')))
  expect(keys$).toBeObservable('s', { s: ['navigation'] })
}))
