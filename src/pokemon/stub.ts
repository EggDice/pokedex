import { createStubRestClient, StubEndpoint } from '@/rest/stub'
import type {
  PokemonApi,
  PokemonApiClent,
  PokemonApiListRespnse,
  PokemonApiListEndpoint,
  PokemonApiSingleResponse,
  PokemonApiSingleEndpoint,
  PokemonApiSingleRequest,
} from './api'

const pokemonApiSingleResponse: PokemonApiSingleResponse = {
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

const pokemonApiListResponse: PokemonApiListRespnse = {
  results: Array.from({ length: 151 }, (_, i) => (
    {
      name: i === 0 ? 'bulbasaur' : `pokemon-${i}`,
    }
  )),
} as const

const pokemonApiListEndpoint: StubEndpoint<PokemonApiListEndpoint> = {
  request: {
    method: 'GET',
    pathname: '/api/v2/pokemon/',
    search: {
      offset: 0,
      limit: 151,
    },
  },
  response: pokemonApiListResponse,
}

const pokemonApiSingleRequest: PokemonApiSingleRequest = {
  method: 'GET',
  pathname: '/api/v2/pokemon/1/',
}

const pokemonApiSingleEndpoint: StubEndpoint<PokemonApiSingleEndpoint> = {
  request: pokemonApiSingleRequest,
  response: pokemonApiSingleResponse,
}

const pokemonApiSearchRequest: PokemonApiSingleRequest = {
  method: 'GET',
  pathname: '/api/v2/pokemon/bulbasaur/',
}

const pokemonApiSearchEndpoint: StubEndpoint<PokemonApiSingleEndpoint> = {
  request: pokemonApiSearchRequest,
  response: pokemonApiSingleResponse,
}

const pokemonApiSearchNotFoundRequest: PokemonApiSingleRequest = {
  method: 'GET',
  pathname: '/api/v2/pokemon/not exits/',
}

const pokemonApiSearchNotFoundEndpoint: StubEndpoint<PokemonApiSingleEndpoint> = {
  request: pokemonApiSearchNotFoundRequest,
  response: pokemonApiSingleResponse,
}

export const pokemonApi = [
  {
    url: 'https://pokeapi.co/api/v2/pokemon/1',
    response: pokemonApiSingleResponse,
  },
  {
    url: 'https://pokeapi.co/api/v2/pokemon/bulbasaur',
    response: pokemonApiSingleResponse,
  },
  {
    url: 'https://pokeapi.co/api/v2/pokemon/not exist',
    response: new Error('not found'),
  },
  {
    url: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151',
    response: pokemonApiListResponse,
  },
]

const endpoints = [
  pokemonApiListEndpoint,
  pokemonApiSingleEndpoint,
  pokemonApiSearchEndpoint,
  pokemonApiSearchNotFoundEndpoint,
] as const

export const pokemonApiClient: PokemonApiClent =
  createStubRestClient<PokemonApi, typeof endpoints>(endpoints)
