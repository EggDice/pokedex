import { distinctUntilChanged, map } from 'rxjs/operators';
import { coreMarbles } from '../core/marbles';
import { appStore } from '../app/app-store';
import { createListing } from './listing-feature';
import { pokemonServiceFake as pokemonService } from '../pokemon/fake';

test('load pokemon list', coreMarbles((m) => {
  const store = appStore();
  const listing = createListing({store, pokemonService});
  listing.loadPokemonList();
  const isListLoaded$ = listing.isListLoaded$.pipe(distinctUntilChanged())
  m.expect(isListLoaded$).toBeObservable(m.coldBoolean('ft'))
  const pokemons$ = listing.pokemons$.pipe(
    distinctUntilChanged(),
    map(({ length }) => length),
  );
  m.expect(pokemons$).toBeObservable(m.cold('01', { '0': 0, '1': 151 }));
}));

test('search pokemon', coreMarbles((m) => {
  const store = appStore();
  const listing = createListing({store, pokemonService});
  listing.search('bulbasaur');
  const isListLoaded$ = listing.isListLoaded$.pipe(distinctUntilChanged())
  m.expect(isListLoaded$).toBeObservable(m.coldBoolean('ft'))
  const pokemons$ = listing.pokemons$.pipe(
    distinctUntilChanged(),
    map(({ length }) => length),
  );
  m.expect(pokemons$).toBeObservable(m.cold('01', { '0': 0, '1': 1 }));
}));

test('select pokemon', coreMarbles((m) => {
  const store = appStore();
  const listing = createListing({store, pokemonService});
  listing.select(1);
  const isDetailsLoaded$ = listing.isDetailsLoaded$.pipe(distinctUntilChanged())
  m.expect(isDetailsLoaded$).toBeObservable(m.coldBoolean('ft'))
  const details$ = listing.details$.pipe(distinctUntilChanged())
  m.expect(details$).toBeObservable(m.cold('01', {
    '0': undefined,
    '1': {
      id: 1,
      name: 'bulbasaur',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      types: [ 'grass', 'poison' ],
      stats: [
        { name: 'hp', value: 45 },
        { name: 'attack', value: 49 },
        { name: 'defense', value: 49 },
        { name: 'special-attack', value: 65 },
        { name: 'special-defense', value: 65 },
        { name: 'speed', value: 45 },
      ],
    },
  }))
}));
