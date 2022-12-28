import { createJsonRestClient } from '@/rest/json'
import type { JsonRestClient } from '@/rest/json'
import type { RestEndpoint } from '@/rest/service'

const POKEMON_BASE_PATHNAME = '/api/v2/pokemon/' as const

export type PokemonApiListRequest = {
  method: 'GET'
  pathname: typeof POKEMON_BASE_PATHNAME
  search: {
    offset: number
    limit: number
  }
}

export type PokemonApiListRespnse = {
  results: Array<{ name: string }>
}

export type PokemonApiListEndpoint = RestEndpoint<PokemonApiListRequest, PokemonApiListRespnse>

export type PokemonApiClent = JsonRestClient<PokemonApi>

export type PokemonApiSingleRequest = {
  method: 'GET'
  pathname: `${typeof POKEMON_BASE_PATHNAME}${string}/`
}

type PokemonApiResponseStat = {
  base_stat: number
  stat: {
    name: string
  }
}

type PokemonApiResponseType = {
  type: {
    name: string
  }
}

export type PokemonApiSingleResponse = {
  id: number
  name: string
  stats: PokemonApiResponseStat[]
  types: PokemonApiResponseType[]
}

export type PokemonApiSingleEndpoint =
  RestEndpoint<PokemonApiSingleRequest, PokemonApiSingleResponse>

export type PokemonApi =
  | PokemonApiListEndpoint
  | PokemonApiSingleEndpoint

export const pokemonApiClient =
  createJsonRestClient<PokemonApi>('https', 'pokeapi.co') // TODO satisfies PokemonApiClent

export const createListPokemonRequest =
  ({ offset, limit }: { offset: number, limit: number }): PokemonApiListRequest => ({
    method: 'GET',
    pathname: POKEMON_BASE_PATHNAME,
    search: {
      offset,
      limit,
    },
  })

export const createSinglePokemonRequest =
  <TOKEN extends string | number>(token: TOKEN): PokemonApiSingleRequest => ({
    method: 'GET',
    pathname: `${POKEMON_BASE_PATHNAME}${token}/`,
  })
