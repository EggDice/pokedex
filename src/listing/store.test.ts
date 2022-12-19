import {
  listingReducer,
  createFetchAll,
  createListLoaded,
  createSearch,
  createDetailsLoaded,
  createSelect,
  createListError,
} from './store'
import { createStoreError } from '@core/store'
import { STORE_INIT } from '@core/fake'

test('Default state is loading', () => {
  const initialState = listingReducer(undefined, STORE_INIT)
  expect(initialState).toEqual({
    listingStatus: 'initial' as const,
    searchTerm: '',
    pokemons: [],
    selectedPokemon: 0,
    details: undefined,
  })
})

test('Start loading pokemons', () => {
  const initialState = {
    listingStatus: 'initial' as const,
    searchTerm: '',
    pokemons: [],
    selectedPokemon: 0,
    details: undefined,
  }
  const state = listingReducer(initialState, createFetchAll())
  expect(state).toEqual({
    listingStatus: 'loading-list',
    searchTerm: '',
    pokemons: [],
    selectedPokemon: 0,
    details: undefined,
  })
})

test('Finish loading pokemons', () => {
  const initialState = {
    listingStatus: 'initial' as const,
    searchTerm: '',
    pokemons: [],
    selectedPokemon: 0,
    details: undefined,
  }
  const state = listingReducer(initialState, createListLoaded([
    { name: 'bulbasour', image: 'src', id: 1 },
  ]))
  expect(state).toEqual({
    listingStatus: 'loaded',
    searchTerm: '',
    pokemons: [{ name: 'bulbasour', image: 'src', id: 1 }],
    selectedPokemon: 0,
    detials: undefined,
  })
})

test('Start searching', () => {
  const initialState = {
    listingStatus: 'initial' as const,
    searchTerm: '',
    pokemons: [],
    selectedPokemon: 0,
    details: undefined,
  }
  const state = listingReducer(initialState, createSearch('bulbasaur'))
  expect(state).toEqual({
    listingStatus: 'loading-list',
    searchTerm: 'bulbasaur',
    pokemons: [],
    selectedPokemon: 0,
    details: undefined,
  })
})

test('Select pokemon', () => {
  const initialState = {
    listingStatus: 'initial' as const,
    searchTerm: '',
    pokemons: [],
    selectedPokemon: 0,
    details: undefined,
  }
  const state = listingReducer(initialState, createSelect(1))
  expect(state).toEqual({
    listingStatus: 'loading-details',
    searchTerm: '',
    pokemons: [],
    selectedPokemon: 1,
    details: undefined,
  })
})

test('Select pokemon loaded', () => {
  const initialState = {
    listingStatus: 'loading-details' as const,
    searchTerm: '',
    pokemons: [],
    selectedPokemon: 1,
    details: undefined,
  }
  const state = listingReducer(initialState, createDetailsLoaded({
    name: 'bulbasour', types: [], stats: [], image: '', id: 1,
  }))
  expect(state).toEqual({
    listingStatus: 'loaded',
    searchTerm: '',
    pokemons: [],
    selectedPokemon: 1,
    details: {
      name: 'bulbasour',
      types: [],
      stats: [],
      image: '',
      id: 1,
    },
  })
})

test('Error during loading listing', () => {
  const initialState = {
    listingStatus: 'loading-details' as const,
    searchTerm: '',
    pokemons: [],
    selectedPokemon: 0,
    details: undefined,
  }
  const state = listingReducer(initialState, createListError(createStoreError('')))
  expect(state).toEqual({
    listingStatus: 'loading-error',
    searchTerm: '',
    pokemons: [],
    selectedPokemon: 0,
    details: undefined,
  })
})
