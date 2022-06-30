import type { HttpGet } from '../http';
// We only handle only the original first 151
const POKEMON_COUNT = 151;

// We are assuming the links not going to change, it is not totally future
// proof but it spares an HTTP request for each pokemon
const getImageById = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

const getAllImages = () =>
  Array.from({ length: POKEMON_COUNT }, (_, i) => i + 1)
    .map(getImageById)

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

export type PokemonApiResponse = {
  name: string,
  stats: PokemonStat[],
  types: PokemonType[],
}

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const createPokemonService = (httpService: HttpGet) => {
  const getDetailsById = async (id: number) => {
    const pokemonApi = httpService<PokemonApiResponse>(`${BASE_URL}/${id}`);
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
    getImageById,
    getAllImages,
    getDetailsById,
  };
};
