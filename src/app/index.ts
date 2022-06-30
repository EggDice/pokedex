import type { HttpGet } from '../http';
import type { ListingService } from '../listing/service';
import { createListingService } from '../listing/service';
import { createPokemonService } from '../pokemon/service';

type ExternalServices = {
  httpGet: HttpGet,
}

type InternalServices = {
  listing: ListingService,
}

type Run = (services: InternalServices) => void

export const createApp = ({
  services,
  run,
}: {
  services: ExternalServices,
  run: Run
}) => {
  const pokemonService = createPokemonService(services.httpGet);
  const listing = createListingService(pokemonService);
  run({ listing })
}
