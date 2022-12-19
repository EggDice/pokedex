import { appStore } from './app-store'
import { coreMarbles } from '@core/marbles'
import { map } from 'rxjs/operators'
import { LISTING_NAMESPACE } from '@/listing/config'
import { NAVIGATION_NAMESPACE } from '@/navigation/config'

test('Should have listing', coreMarbles(({ expect }) => {
  const store = appStore()
  const keys$ = store.state$.pipe(map((state) =>
    Object.keys(state).filter((key) => key === LISTING_NAMESPACE)))
  expect(keys$).toBeObservable('s', { s: [LISTING_NAMESPACE] })
}))

test('Should have navigation', coreMarbles(({ expect }) => {
  const store = appStore()
  const keys$ = store.state$.pipe(map((state) =>
    Object.keys(state).filter((key) => key === NAVIGATION_NAMESPACE)))
  expect(keys$).toBeObservable('s', { s: [NAVIGATION_NAMESPACE] })
}))
