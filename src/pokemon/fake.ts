import { createPokemonService } from './service';
import { httpGetStub } from '../http/stub';

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

const listPokemonResponse = {
  results: Array.from({ length: 151 }, (_, i) => (
    {
      name: i === 0 ? 'bulbasaur' : `pokemon-${i}`,
    }
  )),
}

export const pokemonHttpStub = httpGetStub([
  {
    url: 'https://pokeapi.co/api/v2/pokemon/1',
    response: singlePokemonResponse,
  },
  {
    url: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151',
    response: listPokemonResponse,
  },
]);

export const pokemonServiceFake = createPokemonService(pokemonHttpStub);
