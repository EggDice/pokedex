import { listingCommand } from './command'
import { map } from 'rxjs/operators'
import { coreMarbles } from '../core/marbles'
import { appStore } from '../app/app-store'

test('load pokemon list', coreMarbles((m) => {
  const store = appStore()
  const command = listingCommand(store)
  command.loadPokemonList()
  const listingState$ = store.state$.pipe(map(({ listing }) => listing))
  m.expect(listingState$).toBeObservable('l', {
    l: {
      listingStatus: 'loading-list',
      searchTerm: '',
      pokemons: [],
      selectedPokemon: 0,
      details: undefined,
    },
  })
}))

test('set search term', coreMarbles((m) => {
  const store = appStore()
  const command = listingCommand(store)
  command.search('bulbasaur')
  const listingState$ = store.state$.pipe(map(({ listing }) => listing))
  m.expect(listingState$).toBeObservable('l', {
    l: {
      listingStatus: 'loading-list',
      searchTerm: 'bulbasaur',
      pokemons: [],
      selectedPokemon: 0,
      details: undefined,
    },
  })
}))

test('select pokemon', coreMarbles((m) => {
  const store = appStore()
  const command = listingCommand(store)
  command.select(1)
  const listingState$ = store.state$.pipe(map(({ listing }) => listing))
  m.expect(listingState$).toBeObservable('l', {
    l: {
      listingStatus: 'loading-details',
      searchTerm: '',
      pokemons: [],
      selectedPokemon: 1,
      details: undefined,
    },
  })
}))
