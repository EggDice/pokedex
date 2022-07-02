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

test('search pokemon', coreMarbles((m) => {
  const store = appStore();
  const pokemonService = {
    getAllPokemon: () => mockObservableReturn([
      { name: 'bulbasaur', id: 1, image: 'source' }
    ]),
  } as unknown as PokemonService;
  const listing = createListing({store, pokemonService});
  listing.search('');
  const isListLoaded$ = listing.isListLoaded$.pipe(distinctUntilChanged())
  m.expect(isListLoaded$).toBeObservable(m.coldBoolean('ft'))
  const pokemons$ = listing.pokemons$.pipe(distinctUntilChanged())
  m.expect(pokemons$).toBeObservable(m.cold('01', {
    '0': [],
    '1': [ { name: 'bulbasaur', id: 1, image: 'source' } ],
  }))
}))

test('select pokemon', coreMarbles((m) => {
  const store = appStore();
  const pokemonService = {
    getPokemonById: () => mockObservableReturn(
      { name: 'bulbasaur', types: [], stats: [] }
    ),
  } as unknown as PokemonService;
  const listing = createListing({store, pokemonService});
  listing.select(1);
  const isDetailsLoaded$ = listing.isDetailsLoaded$.pipe(distinctUntilChanged())
  m.expect(isDetailsLoaded$).toBeObservable(m.coldBoolean('ft'))
  const details$ = listing.details$.pipe(distinctUntilChanged())
  m.expect(details$).toBeObservable(m.cold('01', {
    '0': undefined,
    '1': { name: 'bulbasaur', types: [], stats: [] },
  }))
}))



const mockObservableReturn = (value: any) => of(value).pipe(delay(1));
