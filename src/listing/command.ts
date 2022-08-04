import { fetchAllCreator, searchCreator, selectCreator } from './store'
import type { AppStore } from '../app/app-store'

export interface ListingCommand {
  loadPokemonList: () => void
  search: (term: string) => void
  select: (id: number) => void
}

export const listingCommand = (appStore: AppStore): ListingCommand => {
  return {
    loadPokemonList: () => {
      appStore.send(fetchAllCreator())
    },
    search: (term: string) => {
      appStore.send(searchCreator(term))
    },
    select: (id: number) => {
      appStore.send(selectCreator(id))
    },
  }
}
