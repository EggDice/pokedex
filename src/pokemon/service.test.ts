import { createPokemonService } from './service';
import { pokemonHttpStub } from './fake';

test('get image by id', () => {
  const image = createPokemonService(pokemonHttpStub).getImageById(1);
  expect(image).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
});

test('get all images', () => {
  const images = createPokemonService(pokemonHttpStub).getAllImages();
  expect(images.length).toBe(151);
  expect(images[0]).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
});

test('get all pokemon names', async () => {
  const names = await createPokemonService(pokemonHttpStub).getAllNames();
  expect(names[0]).toBe('bulbasaur');
});

test('get details on single pokemon by id', async () => {
  const details = await createPokemonService(pokemonHttpStub).getPokemonById(1);
  expect(details.name).toBe('bulbasaur');
  expect(details.types).toEqual(['grass', 'poison']);
  expect(details.stats).toEqual([
    { name: 'hp', value: 45 },
    { name: 'attack', value: 49 },
    { name: 'defense', value: 49 },
    { name: 'special-attack', value: 65 },
    { name: 'special-defense', value: 65 },
    { name: 'speed', value: 45 },
  ]);
});

test('get details on single pokemon by name', async () => {
  const details = await createPokemonService(pokemonHttpStub).getPokemonByName('bulbasour');
  expect(details.name).toBe('bulbasaur');
  expect(details.types).toEqual(['grass', 'poison']);
  expect(details.stats).toEqual([
    { name: 'hp', value: 45 },
    { name: 'attack', value: 49 },
    { name: 'defense', value: 49 },
    { name: 'special-attack', value: 65 },
    { name: 'special-defense', value: 65 },
    { name: 'speed', value: 45 },
  ]);
});

test('get details on single pokemon by name if not found', async () => {
  const details = await createPokemonService(pokemonHttpStub).getPokemonByName('not exist');
  expect(details).toBe(undefined);
});


