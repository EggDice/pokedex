import type { Pokemon, ListedPokemon } from './type'

import { defer, catchError, of } from 'rxjs'
import type { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import type { HttpGet } from '../http'

export interface PokemonService {
  getAllPokemon: () => Observable<ListedPokemon[]>
  getPokemonById: (id: number) => Observable<Pokemon | undefined>
  getPokemonByName: (name: string) => Observable<Pokemon | undefined>
}

interface PokemonApiResponseStat {
  base_stat: number
  stat: {
    name: string
  }
}

interface PokemonApiResponseType {
  type: {
    name: string
  }
}

interface PokemonApiResponse {
  id: number
  name: string
  stats: PokemonApiResponseStat[]
  types: PokemonApiResponseType[]
}

interface ListPokemonApiRespnse {
  results: Array<{ name: string }>
}

// We only handle only the original first 151
const POKEMON_COUNT = 151

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon'

export const createPokemonService = (httpService: HttpGet): PokemonService => {
  // We are assuming the links not going to change, it is not totally future
  // proof but it spares an HTTP request for each pokemon
  const getImageById = (id: number): string =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

  const getAllImages = (): string[] =>
    Array.from({ length: POKEMON_COUNT }, (_, i) => i + 1)
      .map(getImageById)

  const getAllNames = (): Observable<string[]> => {
    const listPokemonApi = httpService<ListPokemonApiRespnse>(`${BASE_URL}/?offset=0&limit=151`)
    return defer(listPokemonApi).pipe(
      map(({ results }) => (results ?? []).map(({ name }) => name)),
    )
  }

  const getAllPokemon = (): Observable<ListedPokemon[]> => {
    const images = getAllImages()
    const names$ = getAllNames()
    return names$.pipe(
      map(
        (names) =>
          names.map((name: string, i: number) => (
            { name, id: i + 1, image: images[i] }
          )),
      ),
    )
  }

  const getPokemonByToken =
    <TOKEN extends string | number> (token: TOKEN): Observable<Pokemon | undefined> => {
      const pokemonApi = httpService<PokemonApiResponse>(`${BASE_URL}/${token}`)
      return defer(pokemonApi).pipe(
        map(({ name, types, stats, id }) => {
          const normalizedTypes = types.map(({ type: { name } }) => name)
          const normalizedStats = stats.map(
            // this comes from the API so has to be pascal_case
            // eslint-disable-next-line @typescript-eslint/naming-convention
            ({ base_stat, stat: { name } }) => ({ name, value: base_stat }),
          )
          return {
            name,
            id,
            image: getImageById(id),
            types: normalizedTypes,
            stats: normalizedStats,
          }
        }),
        catchError(() => of(undefined)),
      )
    }

  return {
    getAllPokemon,
    getPokemonById: getPokemonByToken<number>,
    getPokemonByName: getPokemonByToken<string>,
  }
}
