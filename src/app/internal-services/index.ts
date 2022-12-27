import { appStore } from '@/app/app-store'
import { createListing } from '@/listing'
import { createPokemonService } from '@/pokemon/service'
import { createNavigation, createNavigationService } from '@/navigation'
import { router } from '@/router'
import type { ExternalServices, InternalServices } from '@/app/type'

export const getInternalServices = ({
  pokemonApiClient,
  history,
}: ExternalServices): InternalServices => {
  const store = appStore()
  const navigationService = createNavigationService(history)
  const navigation = createNavigation({ store, navigationService })
  const pokemonService = createPokemonService(pokemonApiClient)
  const listing = createListing({ store, pokemonService, router })
  return { listing, navigation }
}
