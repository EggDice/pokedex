import { listingCommand } from './listing-command';
import { map } from 'rxjs/operators';
import { coreMarbles } from '../core/marbles';
import { appStore } from '../app/app-store';

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

