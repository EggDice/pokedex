import type { ListingFeature } from '@/listing'
import { LISTING_NAMESPACE } from '@/listing/config'
import type { NavigationFeature } from '@/navigation'
import { NAVIGATION_NAMESPACE } from '@/navigation/config'
import { PokemonApiClent } from '@/pokemon/api'
import type { History } from 'history'

export type ExternalServices = {
  pokemonApiClient: PokemonApiClent
  history: History
}

export type InternalServices = {
  [LISTING_NAMESPACE]: ListingFeature
  [NAVIGATION_NAMESPACE]: NavigationFeature
}
