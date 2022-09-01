import { map } from 'rxjs/operators'
import { coreMarbles } from '@core/marbles'
import { createListing } from './feature'
import { createNavigation } from '@/navigation'
import { createNavigationServiceFake as createNavigationService } from '@/navigation/fake'
import { pokemonServiceFake as pokemonService, BULBASAUR } from '@/pokemon/fake'
import { createAppStore } from './fake'
import { router } from '@/router'

test('load pokemon list', coreMarbles(({ expect }) => {
  const { store } = createAppStore()
  const {
    loadPokemonList,
    isListLoaded$,
    pokemons$,
  } = createListing({ store, pokemonService, router })
  loadPokemonList()
  expect(isListLoaded$).toBeObservableBoolean('ft')
  const pokemonsLength$ = pokemons$.pipe(
    map(({ length }) => length),
  )
  expect(pokemonsLength$).toBeObservable('01', { 0: 0, 1: 151 })
}))

test('search pokemon', coreMarbles(({ expect }) => {
  const { store } = createAppStore()
  const {
    search,
    isListLoaded$,
    pokemons$,
  } = createListing({ store, pokemonService, router })
  search('bulbasaur')
  expect(isListLoaded$).toBeObservableBoolean('ft')
  const pokemonsLength$ = pokemons$.pipe(
    map(({ length }) => length),
  )
  expect(pokemonsLength$).toBeObservable('01', { 0: 0, 1: 1 })
}))

test('select pokemon', coreMarbles(({ expect }) => {
  const { store } = createAppStore()
  const {
    select,
    isDetailsLoaded$,
    details$,
  } = createListing({ store, pokemonService, router })
  select(1)
  expect(isDetailsLoaded$).toBeObservableBoolean('ft')
  expect(details$).toBeObservable('01', {
    0: undefined,
    1: BULBASAUR,
  })
}))

test('select pokemon', coreMarbles(({ expect, coldCall }) => {
  const { store } = createAppStore()
  const navigationService = createNavigationService()
  createNavigation({ store, navigationService, router })
  const {
    details$,
  } = createListing({ store, pokemonService, router })
  coldCall('1', {
    1: () => navigationService.push({
      pathname: '/pokemon/1',
      hash: '',
      search: '',
    }),
  })
  expect(details$).toBeObservable('01', {
    0: undefined,
    1: BULBASAUR,
  })
}))
