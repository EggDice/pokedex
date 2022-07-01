import { fetchAllCreator } from './listing-store';
import type { AppStore } from '../app/app-store';

export const listingCommand = (appStore: AppStore) => {
  return {
    loadPokemonList: () => {
      appStore.send(fetchAllCreator());
    },
  }
}

