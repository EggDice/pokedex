import {
  listingReducer,
  fetchAllCreator,
  listLoadedCreator,
  searchCreator,
  detailsLoadedCreator,
  selectCreator,
} from './store'

test('Default state is loading', () => {
  const initialState = listingReducer(undefined, { type: 'init' })
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
  const state = listingReducer(initialState, fetchAllCreator())
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
  const state = listingReducer(initialState, listLoadedCreator([
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
  const state = listingReducer(initialState, searchCreator('bulbasaur'))
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
  const state = listingReducer(initialState, selectCreator(1))
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
  const state = listingReducer(initialState, detailsLoadedCreator({
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
