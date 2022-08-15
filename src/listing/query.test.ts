import { coreMarbles } from '@core/marbles'
import { listingQuery } from './query'
import type { AppStoreState } from '@/app/app-store'
import { getDummyState } from '@core/query'

const state = getDummyState<AppStoreState>('listing')

test('isListLoaded$ should be false if not loaded', coreMarbles((m) => {
  const { isListLoaded$ } = listingQuery(state(m.cold('iadff', STATE_VALUES)))
  m.expect(isListLoaded$).toBeObservableBoolean('fftt')
}))

test('isDetailsLoaded$ should be false if not loaded', coreMarbles((m) => {
  const { isDetailsLoaded$ } = listingQuery(state(m.cold('iadff', STATE_VALUES)))
  m.expect(isDetailsLoaded$).toBeObservableBoolean('ftft')
}))

test('isDetailsLoaded$ should be false if not loaded', coreMarbles((m) => {
  const { isModalOpen$ } = listingQuery(state(m.cold('011', {
    0: { selectedPokemon: 0 },
    1: { selectedPokemon: 1 },
  })))
  m.expect(isModalOpen$).toBeObservableBoolean('ft')
}))

test('pokemons$ should give the list of pokemons', coreMarbles((m) => {
  const { pokemons$ } = listingQuery(state(m.cold('00', {
    0: { pokemons: [] },
  })))
  m.expect(pokemons$).toBeObservable(m.cold('0', { 0: [] }))
}))

test('searchTerm$ should give the last searched term', coreMarbles((m) => {
  const { searchTerm$ } = listingQuery(state(m.cold('00', {
    0: { searchTerm: 'hello' },
  })))
  m.expect(searchTerm$).toBeObservable(m.cold('0', { 0: 'hello' }))
}))

test('details$ should give the last searched term', coreMarbles((m) => {
  const { details$ } = listingQuery(state(m.cold('00', {
    0: { details: undefined },
  })))
  m.expect(details$).toBeObservable(m.cold('0', { 0: undefined }))
}))

const STATE_VALUES = {
  i: { listingStatus: 'initial' },
  a: { listingStatus: 'loading-list' },
  d: { listingStatus: 'loading-details' },
  f: { listingStatus: 'loaded' },
}
