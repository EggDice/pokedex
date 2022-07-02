import { createPokemonService } from './service';
import { pokemonHttpStub } from './fake';

const pokemonService = createPokemonService(pokemonHttpStub);

test('get all pokemon', async () => {
  const pokemons = await pokemonService.getAllPokemon();
  const [ { image, id, name } ] = pokemons;
  expect(image).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
  expect(id).toBe(1)
  expect(name).toBe('bulbasaur')
});

test('get details on single pokemon by id', async () => {
  const details = await pokemonService.getPokemonById(1);
  expect(details?.name).toBe('bulbasaur');
  expect(details?.types).toEqual(['grass', 'poison']);
  expect(details?.stats).toEqual([
    { name: 'hp', value: 45 },
    { name: 'attack', value: 49 },
    { name: 'defense', value: 49 },
    { name: 'special-attack', value: 65 },
    { name: 'special-defense', value: 65 },
    { name: 'speed', value: 45 },
  ]);
});

test('get details on single pokemon by name', async () => {
  const details = await pokemonService.getPokemonByName('bulbasaur');
  expect(details?.id).toBe(1);
  expect((details?.image?.length ?? 0) > 0).toBe(true);
  expect(details?.name).toBe('bulbasaur');
  expect(details?.types).toEqual(['grass', 'poison']);
  expect(details?.stats).toEqual([
    { name: 'hp', value: 45 },
    { name: 'attack', value: 49 },
    { name: 'defense', value: 49 },
    { name: 'special-attack', value: 65 },
    { name: 'special-defense', value: 65 },
    { name: 'speed', value: 45 },
  ]);
});

test('get details on single pokemon by name if not found', async () => {
  const details = await pokemonService.getPokemonByName('not exist');
  expect(details).toBe(undefined);
});


