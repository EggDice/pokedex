import { listingQuery } from './query'
import { listingCommand } from './command'
import { listingEffect } from './effect'
import type { ListingQuery } from './query'
import type { ListingCommand } from './command'
import type { ListingEvent, AppStoreListingStateSlice } from './store'
import type{ PokemonService } from '@/pokemon'
import type { CoreStore, CoreEvent } from '@core/store'
import type { Router } from '@/navigation'

interface ListingFeatureArgs<APP_STORE_EVENT extends CoreEvent> {
  store: CoreStore<AppStoreListingStateSlice, APP_STORE_EVENT | ListingEvent>
  pokemonService: PokemonService
  router: Router
}

export interface ListingFeature extends ListingQuery, ListingCommand {}

export const createListing =
  <APP_STORE_EVENT extends CoreEvent> (
    { store, pokemonService, router }: ListingFeatureArgs<APP_STORE_EVENT>,
  ): ListingFeature => {
    const query = listingQuery(store)
    const command = listingCommand(store)
    const {
      handleFetchAll,
      handleSearch,
      handleSelect,
      handleSelectRoute,
    } = listingEffect<AppStoreListingStateSlice>({ pokemonService, router })

    store.registerEffect(handleFetchAll)
    store.registerEffect(handleSearch)
    store.registerEffect(handleSelect)
    store.registerEffect(handleSelectRoute)

    return {
      ...command,
      ...query,
    }
  }
