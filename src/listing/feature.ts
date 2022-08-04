import { listingQuery } from './query'
import type { ListingQuery } from './query'
import { listingEffect } from './effect'
import type { AppStore } from '@/app/app-store'
import { PokemonService } from '@/pokemon/service'
import { listingCommand } from './command'
import type { ListingCommand } from './command'

interface ListingFeatureArgs {
  store: AppStore
  pokemonService: PokemonService
}

export interface ListingFeature extends ListingQuery, ListingCommand {}

export const createListing =
  ({ store, pokemonService }: ListingFeatureArgs): ListingFeature => {
    const query = listingQuery(store)
    const command = listingCommand(store)
    const {
      handleFetchAll,
      handleSearch,
      handleSelect,
    } = listingEffect(pokemonService)

    store.registerEffect(handleFetchAll)
    store.registerEffect(handleSearch)
    store.registerEffect(handleSelect)

    return {
      ...command,
      ...query,
    }
  }
