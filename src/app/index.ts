import type { HttpGet } from '../http'
import { appStore } from '../app/app-store'
import { createListing } from '@/listing'
import type { ListingFeature } from '@/listing'
import { createPokemonService } from '../pokemon/service'

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
}): void => {
  const pokemonService = createPokemonService(services.httpGet)
  const store = appStore()
  const listing = createListing({ store, pokemonService })
  run({ listing })
}
