import { fetchAllCreator, searchCreator, selectCreator } from './listing-store';
import type { AppStore } from '../app/app-store';

export const listingCommand = (appStore: AppStore) => {
  return {
    loadPokemonList: () => {
      appStore.send(fetchAllCreator());
    },
    search: (term: string) => {
      appStore.send(searchCreator(term));
    },
    select: (id: number) => {
      appStore.send(selectCreator(id));
    },
  }
}

