import { listingCommand } from './command'
import { coreMarbles } from '@core/marbles'
import { createAppStore } from './fake'

test('load pokemon list', coreMarbles(({ expect }) => {
  const { store, sliceState$ } = createAppStore()
  const command = listingCommand(store)
  command.loadPokemonList()
  expect(sliceState$).toBeObservable('l', {
    l: {
      listingStatus: 'loading-list',
      searchTerm: '',
      pokemons: [],
      selectedPokemon: 0,
      details: undefined,
    },
  })
}))

test('set search term', coreMarbles(({ expect }) => {
  const { store, sliceState$ } = createAppStore()
  const command = listingCommand(store)
  command.search('bulbasaur')
  expect(sliceState$).toBeObservable('l', {
    l: {
      listingStatus: 'loading-list',
      searchTerm: 'bulbasaur',
      pokemons: [],
      selectedPokemon: 0,
      details: undefined,
    },
  })
}))

test('select pokemon', coreMarbles(({ expect }) => {
  const { store, sliceState$ } = createAppStore()
  const command = listingCommand(store)
  command.select(1)
  expect(sliceState$).toBeObservable('l', {
    l: {
      listingStatus: 'loading-details',
      searchTerm: '',
      pokemons: [],
      selectedPokemon: 1,
      details: undefined,
    },
  })
}))
