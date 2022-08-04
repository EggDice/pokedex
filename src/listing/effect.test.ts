import { listingEffect } from './effect'
import { coreMarbles } from '../core/marbles'
import { map } from 'rxjs/operators'
import type { ListingEvent } from './store'
import { pokemonServiceFake as pokemonService } from '../pokemon/fake'

test('load pokemon list', coreMarbles((m) => {
  const FETCH_ALL: ListingEvent = { type: 'listing/fetchAll' }
  const effect = listingEffect(pokemonService)
  const event$ = m.cold('s', { s: FETCH_ALL })
  const output$ = effect.handleFetchAll(event$).pipe(
    map(({ type, payload }) => ({ type, payload: payload.length })),
  )
  m.expect(output$).toBeObservable('-d', {
    d: { type: 'listing/listLoaded', payload: 151 },
  })
}))

test('search pokemon list', coreMarbles((m) => {
  const SEARCH_BULBASAUR: ListingEvent = { type: 'listing/search', payload: 'Bulbasaur' }
  const effect = listingEffect(pokemonService)
  const event$ = m.cold('s', { s: SEARCH_BULBASAUR })
  m.expect(effect.handleSearch(event$)).toBeObservable('-d', {
    d: {
      type: 'listing/listLoaded',
      payload: [{
        name: 'bulbasaur',
        id: 1,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      }],
    },
  })
}))

test('load pokemon list on empty search', coreMarbles((m) => {
  const SEARCH_EMPTY: ListingEvent = { type: 'listing/search', payload: '' }
  const effect = listingEffect(pokemonService)
  const event$ = m.cold('s', { s: SEARCH_EMPTY })
  const output$ = effect.handleSearch(event$).pipe(
    map(({ type, payload }) => ({ type, payload: payload.length })),
  )
  m.expect(output$).toBeObservable('-d', {
    d: { type: 'listing/listLoaded', payload: 151 },
  })
}))

test('pick pokemon', coreMarbles((m) => {
  const SELECT_BULBASAUR: ListingEvent = { type: 'listing/select', payload: 1 }
  const effect = listingEffect(pokemonService)
  const event$ = m.cold('s', { s: SELECT_BULBASAUR })
  m.expect(effect.handleSelect(event$)).toBeObservable('-d', {
    d: {
      type: 'listing/detailsLoaded',
      payload: {
        id: 1,
        name: 'bulbasaur',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        types: ['grass', 'poison'],
        stats: [
          { name: 'hp', value: 45 },
          { name: 'attack', value: 49 },
          { name: 'defense', value: 49 },
          { name: 'special-attack', value: 65 },
          { name: 'special-defense', value: 65 },
          { name: 'speed', value: 45 },
        ],
      },
    },
  })
}))
