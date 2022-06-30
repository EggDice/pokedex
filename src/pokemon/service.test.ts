import { createPokemonService } from './service';
import { httpGetStub } from '../http/stub';

test('get image by id', () => {
  const image = createPokemonService(mockHttp).getImageById(1);
  expect(image).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
});

test('get all images', () => {
  const images = createPokemonService(mockHttp).getAllImages();
  expect(images.length).toBe(151);
  expect(images[0]).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
});

test('get details on single pokemon', async () => {
  const details = await createPokemonService(mockHttp).getDetailsById(1);
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

const singlePokemonResponse = {
  name: 'bulbasaur',
  stats: [
    {
      base_stat: 45,
      stat: {
        name: 'hp',
      },
    },
    {
      base_stat: 49,
      stat: {
        name: 'attack',
      },
    },
    {
      base_stat: 49,
      stat: {
        name: 'defense',
      },
    },
    {
      base_stat: 65,
      stat: {
        name: 'special-attack',
      },
    },
    {
      base_stat: 65,
      stat: {
        name: 'special-defense',
      },
    },
    {
      base_stat: 45,
      stat: {
        name: 'speed',
      },
    },
  ],
  types: [
    {
      type: { name: 'grass' },
    },
    {
      type: { name: 'poison' },
    },
  ],
};

const mockHttp = httpGetStub([{
  url: 'https://pokeapi.co/api/v2/pokemon/1',
  response: singlePokemonResponse,
}]);
