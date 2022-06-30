import type { PokemonService } from '../pokemon/service';

export const createListingService = (pokemonService: PokemonService) => {

  const listImagesAndAlts = async () => {
    const sources = pokemonService.getAllImages();
    const names = await pokemonService.getAllNames();
    return names.map((name, i) => ({
      alt: name,
      src: sources[i]
    }));
  };

  return {
    listImagesAndAlts,
  };
};

export type ListingService = ReturnType<typeof createListingService>;

