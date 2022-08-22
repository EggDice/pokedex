import { fetchAllCreator, searchCreator, selectCreator } from './store'
import type { ListingEvent } from './store'
import type { EventReceiver } from '@core/store'

export interface ListingCommand {
  loadPokemonList: () => void
  search: (term: string) => void
  select: (id: number) => void
}

export const listingCommand = <APP_STORE_EVENT extends ListingEvent>
  (appStore: EventReceiver<APP_STORE_EVENT | ListingEvent>): ListingCommand => ({
    loadPokemonList: () => {
      appStore.send(fetchAllCreator())
    },
    search: (term: string) => {
      appStore.send(searchCreator(term))
    },
    select: (id: number) => {
      appStore.send(selectCreator(id))
    },
  })
