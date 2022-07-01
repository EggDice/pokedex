import { distinctUntilChanged } from 'rxjs/operators';
import { coreMarbles } from '../core/marbles';
import { appStore } from '../app/app-store';
import { createListing } from './listing-feature';
import { PokemonService } from '../pokemon/service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

test('load pokemon list', coreMarbles((m) => {
  const store = appStore();
  const pokemonService = {
    getAllPokemon: () => mockObservableReturn([
      { name: 'bulbasaur', id: 1, image: 'source' }
    ]),
  } as unknown as PokemonService;
  const listing = createListing({store, pokemonService});
  listing.loadPokemonList();
  const isListLoaded$ = listing.isListLoaded$.pipe(distinctUntilChanged())
  m.expect(isListLoaded$).toBeObservable(m.coldBoolean('ft'))
  const pokemons$ = listing.pokemons$.pipe(distinctUntilChanged())
  m.expect(pokemons$).toBeObservable(m.cold('01', {
    '0': [],
    '1': [ { name: 'bulbasaur', id: 1, image: 'source' } ],
  }))
}))

const mockObservableReturn = (value: any) => of(value).pipe(delay(1));
