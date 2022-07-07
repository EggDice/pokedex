import { createPokemonService } from './service';
import { pokemonHttpStub } from './fake';
import { coreMarbles } from '../core/marbles';
import { map } from 'rxjs/operators';
import { httpGet } from '../http';
import type { Observable } from 'rxjs';
import type { PokemonDetails } from '../listing/listing-store';

const pokemonService = createPokemonService(pokemonHttpStub);

test('get all pokemon', coreMarbles((m) => {
  const pokemons$ = pokemonService.getAllPokemon();
  const image$ = pokemons$.pipe(map(([ { image } ]) => image));
  m.expect(image$).toBeObservable(m.cold('-(s|)', {
    's': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
  }));
  const id$ = pokemons$.pipe(map(([ { id } ]) => id));
  m.expect(id$).toBeObservable(m.cold('-(1|)', { '1': 1 }));
  const name$ = pokemons$.pipe(map(([ { name } ]) => name));
  m.expect(name$).toBeObservable(m.cold('-(b|)', { 'b': 'bulbasaur' }));
}));

test('smoke for injecting real dependencies', () => {
  createPokemonService(httpGet);
});

test('get details on single pokemon by id', coreMarbles((m) => {
  const details$ = pokemonService.getPokemonById(1) as Observable<PokemonDetails>;
  const name$ = details$.pipe(map(({ name }) => name));
  m.expect(name$).toBeObservable(m.cold('-(b|)', { 'b': 'bulbasaur' }));
  const types$ = details$.pipe(map(({ types }) => types));
  m.expect(types$).toBeObservable(m.cold('-(t|)', { 't': ['grass', 'poison'] }));
  const stats$ = details$.pipe(map(({ stats }) => stats));
  m.expect(stats$).toBeObservable(m.cold('-(s|)', {
    's': [
      { name: 'hp', value: 45 },
      { name: 'attack', value: 49 },
      { name: 'defense', value: 49 },
      { name: 'special-attack', value: 65 },
      { name: 'special-defense', value: 65 },
      { name: 'speed', value: 45 },
    ]
  }));
}));

test('get details on single pokemon by name', coreMarbles((m) => {
  const details$ = pokemonService.getPokemonByName('bulbasaur') as Observable<PokemonDetails>;
  const name$ = details$.pipe(map(({ name }) => name));
  m.expect(name$).toBeObservable(m.cold('-(b|)', { 'b': 'bulbasaur' }));
  const types$ = details$.pipe(map(({ types }) => types));
  m.expect(types$).toBeObservable(m.cold('-(t|)', { 't': ['grass', 'poison'] }));
  const stats$ = details$.pipe(map(({ stats }) => stats));
  m.expect(stats$).toBeObservable(m.cold('-(s|)', {
    's': [
      { name: 'hp', value: 45 },
      { name: 'attack', value: 49 },
      { name: 'defense', value: 49 },
      { name: 'special-attack', value: 65 },
      { name: 'special-defense', value: 65 },
      { name: 'speed', value: 45 },
    ]
  }));
}));

test('get details on single pokemon by name if not found', coreMarbles((m) => {
  const details$ = pokemonService.getPokemonByName('not exist');
  m.expect(details$).toBeObservable(m.cold('-(0|)', { '0': undefined }));
}));
