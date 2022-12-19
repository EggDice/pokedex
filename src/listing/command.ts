import { createFetchAll, createSearch, createSelect } from './store'
import type { ListingEvent } from './store'
import type { EventReceiver } from '@core/store'

export interface ListingCommand {
  loadPokemonList: () => void
  search: (term: string) => void
  select: (id: number) => void
}

export const listingCommand =
  (appStore: EventReceiver<ListingEvent>): ListingCommand => ({
    loadPokemonList: () => {
      appStore.send(createFetchAll())
    },
    search: (term: string) => {
      appStore.send(createSearch(term))
    },
    select: (id: number) => {
      appStore.send(createSelect(id))
    },
  })
