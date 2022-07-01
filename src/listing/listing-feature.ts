import { listingQuery } from './listing-query';
import { listingEffect } from './listing-effect';
import type { AppStore } from '@app/app-store';
import { PokemonService } from '../pokemon/service';
import { listingCommand } from './listing-command';

type ListingFeatureArgs = {
  store: AppStore,
  pokemonService: PokemonService,
};

export const createListing =
  ({ store, pokemonService }: ListingFeatureArgs) => {
    const query = listingQuery(store);
    const command = listingCommand(store);
    const {
      handleFetchAll,
    } = listingEffect(pokemonService);
    store.registerEffect(handleFetchAll);

    return {
      ...command,
      ...query,
    }
  }

export type ListingFeature = ReturnType<typeof createListing>;
