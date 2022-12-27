import type { Pokemon, ListedPokemon } from './type'

import { catchError, of } from 'rxjs'
import type { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { createListPokemonRequest, createSinglePokemonRequest, PokemonApiClent } from './api'
import { TokenNonEmptyString } from '@core/type'

export type PokemonService = {
  getAllPokemon: () => Observable<ListedPokemon[]>
  getPokemonById: (id: number) => Observable<Pokemon | undefined>
  getPokemonByName: (name: string) => Observable<Pokemon | undefined>
}

// We only handle only the original first 151
const POKEMON_COUNT = 151

export const createPokemonService = (pokemonApiClient: PokemonApiClent): PokemonService => {
  // We are assuming the links not going to change, it is not totally future
  // proof but it spares an HTTP request for each pokemon
  const getImageById = (id: number): string =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

  const getAllImages = (): string[] =>
    Array.from({ length: POKEMON_COUNT }, (_, i) => i + 1)
      .map(getImageById)

  const getAllNames = (): Observable<string[]> => {
    return pokemonApiClient(createListPokemonRequest({
      offset: 0,
      limit: POKEMON_COUNT,
    })).pipe(
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

  const getPokemonByToken = <TOKEN extends string | number>
    (token: TokenNonEmptyString<TOKEN>): Observable<Pokemon | undefined> => {
    return pokemonApiClient(createSinglePokemonRequest(token)).pipe(
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
      // TODO: Don't catch all errors just 404
      catchError(() => of(undefined)),
    )
  }

  return {
    getAllPokemon,
    getPokemonById: getPokemonByToken<number>,
    getPokemonByName: getPokemonByToken<string>,
  }
}
