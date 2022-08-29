import { appStore } from '@/app/app-store'
import { createListing } from '@/listing'
import { createPokemonService } from '@/pokemon/service'
import { createNavigation, createNavigationService } from '@/navigation'
import type { ExternalServices, InternalServices } from '@/app/type'
import type { AppStoreEvent } from '@/app'

export const getInternalServices = ({ httpGet, history, router }: ExternalServices): InternalServices => {
  const store = appStore()
  const navigationService = createNavigationService(history)
  const navigation = createNavigation<AppStoreEvent>({ store, navigationService })
  const pokemonService = createPokemonService(httpGet)
  const listing = createListing<AppStoreEvent>({ store, pokemonService, router })
  return { listing, navigation }
}
