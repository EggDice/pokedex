import type { HttpGet } from '../http';
import { map } from 'rxjs/operators';
import { defer, catchError, of } from 'rxjs';

// We only handle only the original first 151
const POKEMON_COUNT = 151;

type PokemonStat = {
  base_stat: number,
  stat: {
    name: string,
  },
};

type PokemonType = {
  type: {
    name: string,
  },
};

type PokemonApiResponse = {
  id: number,
  name: string,
  stats: PokemonStat[],
  types: PokemonType[],
}

type ListPokemonApiRespnse = {
  results: Array<{ name: string }>,
}

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const createPokemonService = (httpService: HttpGet) => {
  // We are assuming the links not going to change, it is not totally future
  // proof but it spares an HTTP request for each pokemon
  const getImageById = (id: number) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  const getAllImages = () =>
    Array.from({ length: POKEMON_COUNT }, (_, i) => i + 1)
      .map(getImageById);

  const getAllNames = () => {
    const listPokemonApi = httpService<ListPokemonApiRespnse>(`${BASE_URL}/?offset=0&limit=151`);
    return defer(listPokemonApi).pipe(
      map(({ results }) => (results ?? []).map(({ name }) => name))
    );
  };

  const getAllPokemon = () => {
    const images = getAllImages();
    const names$ = getAllNames();
    return names$.pipe(
      map(
        (names) =>
          names.map((name: string, i: number) => (
            { name, id: i + 1, image: images[i] }
          ))
      ),
    );
  };

  const getPokemonByToken = <T> (token: T) => {
    const pokemonApi = httpService<PokemonApiResponse>(`${BASE_URL}/${token}`);
    return defer(pokemonApi).pipe(
      map(({ name, types, stats, id}) => {
        const normalizedTypes = types.map(({ type: { name } }) => name);
        const normalizedStats = stats.map(
          ({ base_stat, stat: { name } }) => ({ name, value: base_stat })
        );
        return {
          name,
          id,
          image: getImageById(id),
          types: normalizedTypes,
          stats: normalizedStats,
        };
      }),
      catchError((err) => of(undefined)),
    );
  };

  return {
    getAllPokemon,
    getPokemonById: getPokemonByToken<number>,
    getPokemonByName: getPokemonByToken<string>,
  };
};

export type PokemonService = ReturnType<typeof createPokemonService>;
