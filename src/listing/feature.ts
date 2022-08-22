import { listingQuery } from './query'
import { listingCommand } from './command'
import { listingEffect } from './effect'
import type { ListingQuery } from './query'
import type { ListingCommand } from './command'
import type { ListingState, ListingEvent } from './store'
import type{ PokemonService } from '@/pokemon'
import type { CoreStore, CoreEvent } from '@core/store'

interface ListingFeatureArgs<APP_STORE_EVENT extends CoreEvent> {
  store: CoreStore<{ listing: ListingState }, APP_STORE_EVENT>
  pokemonService: PokemonService
}

export interface ListingFeature extends ListingQuery, ListingCommand {}

export const createListing = <APP_STORE_EVENT extends CoreEvent>
  ({ store, pokemonService }: ListingFeatureArgs<APP_STORE_EVENT | ListingEvent>):
  ListingFeature => {
  const query = listingQuery(store)
  const command = listingCommand(store)
  const {
    handleFetchAll,
    handleSearch,
    handleSelect,
  } = listingEffect<APP_STORE_EVENT>(pokemonService)

  store.registerEffect(handleFetchAll)
  store.registerEffect(handleSearch)
  store.registerEffect(handleSelect)

  return {
    ...command,
    ...query,
  }
}
