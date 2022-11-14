import { coreMarbles } from '@core/marbles'
import { listingQuery } from './query'
import { getStateReadable } from './fake'

test.each([
  ['i', 'f'],
  ['a', 'f'],
  ['d', 't'],
  ['e', 'f'],
  ['f', 't'],
  ['ff', 't'],
])('isListLoaded$ should be false if not loaded - %s -> %s',
  coreMarbles(({ expect, cold }, a, b) => {
    const { isListLoaded$ } = listingQuery(getStateReadable(cold(a, STATE_VALUES)))
    expect(isListLoaded$).toBeObservableBoolean(b)
  }))

test.each([
  ['i', 'f'],
  ['a', 'f'],
  ['d', 'f'],
  ['e', 'f'],
  ['f', 't'],
  ['ff', 't'],
])('isDetailsLoaded$ should be false if not loaded - %s -> %s',
  coreMarbles(({ expect, cold }, a, b) => {
    const { isDetailsLoaded$ } = listingQuery(getStateReadable(cold(a, STATE_VALUES)))
    expect(isDetailsLoaded$).toBeObservableBoolean(b)
  }))

test('isDetailsLoaded$ should be false if not loaded', coreMarbles(({ expect, cold }) => {
  const { isModalOpen$ } = listingQuery(getStateReadable(cold('011', {
    0: { selectedPokemon: 0 },
    1: { selectedPokemon: 1 },
  })))
  expect(isModalOpen$).toBeObservableBoolean('ft')
}))

test('pokemons$ should give the list of pokemons', coreMarbles(({ expect, cold }) => {
  const { pokemons$ } = listingQuery(getStateReadable(cold('00', {
    0: { pokemons: [] },
  })))
  expect(pokemons$).toBeObservable(cold('0', { 0: [] }))
}))

test('searchTerm$ should give the last searched term', coreMarbles(({ expect, cold }) => {
  const { searchTerm$ } = listingQuery(getStateReadable(cold('00', {
    0: { searchTerm: 'hello' },
  })))
  expect(searchTerm$).toBeObservable(cold('0', { 0: 'hello' }))
}))

test('details$ should give the last searched term', coreMarbles(({ expect, cold }) => {
  const { details$ } = listingQuery(getStateReadable(cold('00', {
    0: { details: undefined },
  })))
  expect(details$).toBeObservable(cold('0', { 0: undefined }))
}))

test.each([
  ['i', 'f'],
  ['a', 'f'],
  ['d', 'f'],
  ['e', 't'],
  ['f', 'f'],
  ['ee', 't'],
])('isError$ should be true if loading failed - %s -> %s',
  coreMarbles(({ expect, cold }, a, b) => {
    const { isError$ } = listingQuery(getStateReadable(cold(a, STATE_VALUES)))
    expect(isError$).toBeObservableBoolean(b)
  }))

const STATE_VALUES = {
  i: { listingStatus: 'initial' as const },
  a: { listingStatus: 'loading-list' as const },
  d: { listingStatus: 'loading-details' as const },
  f: { listingStatus: 'loaded' as const },
  e: { listingStatus: 'loading-error' as const },
}
