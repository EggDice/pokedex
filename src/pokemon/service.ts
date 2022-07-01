import type { HttpGet } from '../http';

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

  const getAllNames = async () => {
    const listPokemonApi = httpService<ListPokemonApiRespnse>(`${BASE_URL}/?offset=0&limit=151`);
    const { results } = await listPokemonApi();
    return results.map(({ name }) => name);
  };

  const getAllPokemon = async () => {
    const images = getAllImages();
    const names = await getAllNames();
    return names.map((name: string, i: number) => ({ name, id: i + 1, image: images[i] }));
  };

  const getPokemonByToken = async <T> (token: T) => {
    try {
      return await handleSearch<T>(token);
    } catch {
      return undefined;
    }
  };

  const handleSearch = async <T> (token: T) => {
    const pokemonApi = httpService<PokemonApiResponse>(`${BASE_URL}/${token}`);
    const {
      name,
      types,
      stats,
    } = await pokemonApi();
    const normalizedTypes = types.map(({ type: { name } }) => name);
    const normalizedStats = stats.map(
      ({ base_stat, stat: { name } }) => ({ name, value: base_stat })
    );
    return {
      name,
      types: normalizedTypes,
      stats: normalizedStats,
    };
  };

  return {
    getAllPokemon,
    getPokemonById: getPokemonByToken<number>,
    getPokemonByName: getPokemonByToken<string>,
  };
};

export type PokemonService = ReturnType<typeof createPokemonService>;
