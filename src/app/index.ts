import type { HttpGet } from '@/http'
import { appStore } from '@/app/app-store'
import { createListing } from '@/listing'
import type { ListingFeature } from '@/listing'
import { createPokemonService } from '@/pokemon/service'
import { application } from '@core/application'

interface ExternalServices {
  httpGet: HttpGet
}

interface InternalServices {
  listing: ListingFeature
}

type Run = (services: InternalServices) => void

export const createApp = ({
  services,
  run,
}: {
  services: ExternalServices
  run: Run
}): void => application<ExternalServices, InternalServices>({
  externalServices: services,
  run,
  configure,
})

const configure = ({ httpGet }: ExternalServices): InternalServices => {
  const pokemonService = createPokemonService(httpGet)
  const store = appStore()
  const listing = createListing({ store, pokemonService })
  return { listing }
}
