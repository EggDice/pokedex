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
  id: 1,
}

const listPokemonResponse = {
  results: Array.from({ length: 151 }, (_, i) => (
    {
      name: i === 0 ? 'bulbasaur' : `pokemon-${i}`,
    }
  )),
}

export const pokemonApi = [
  {
    url: 'https://pokeapi.co/api/v2/pokemon/1',
    response: singlePokemonResponse,
  },
  {
    url: 'https://pokeapi.co/api/v2/pokemon/bulbasaur',
    response: singlePokemonResponse,
  },
  {
    url: 'https://pokeapi.co/api/v2/pokemon/not exist',
    response: new Error('not found'),
  },
  {
    url: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151',
    response: listPokemonResponse,
  },
]
