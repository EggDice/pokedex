import { appStore } from '@/app/app-store'
import { createListing } from '@/listing'
import { createPokemonService } from '@/pokemon/service'
import { ExternalServices, InternalServices } from '@/app/type'

export const getInternalServices = ({ httpGet }: ExternalServices): InternalServices => {
  const pokemonService = createPokemonService(httpGet)
  const store = appStore()
  const listing = createListing({ store, pokemonService })
  return { listing }
}
