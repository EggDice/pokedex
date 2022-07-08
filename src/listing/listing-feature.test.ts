import { map } from 'rxjs/operators';
import { coreMarbles } from '../core/marbles';
import { appStore } from '../app/app-store';
import { createListing } from './listing-feature';
import { pokemonServiceFake as pokemonService } from '../pokemon/fake';

test('load pokemon list', coreMarbles((m) => {
  const store = appStore();
  const {
    loadPokemonList,
    isListLoaded$,
    pokemons$,
  } = createListing({ store, pokemonService });
  loadPokemonList();
  m.expect(isListLoaded$).toBeObservable(m.coldBoolean('ft'))
  const pokemonsLength$ = pokemons$.pipe(
    map(({ length }) => length),
  );
  m.expect(pokemonsLength$).toBeObservable(m.cold('01', { '0': 0, '1': 151 }));
}));

test('search pokemon', coreMarbles((m) => {
  const store = appStore();
  const {
    search,
    isListLoaded$,
    pokemons$,
  } = createListing({ store, pokemonService });
  search('bulbasaur');
  m.expect(isListLoaded$).toBeObservable(m.coldBoolean('ft'))
  const pokemonsLength$ = pokemons$.pipe(
    map(({ length }) => length),
  );
  m.expect(pokemonsLength$).toBeObservable(m.cold('01', { '0': 0, '1': 1 }));
}));

test('select pokemon', coreMarbles((m) => {
  const store = appStore();
  const {
    select,
    isDetailsLoaded$,
    details$,
  } = createListing({ store, pokemonService });
  select(1);
  m.expect(isDetailsLoaded$).toBeObservable(m.coldBoolean('ft'))
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
