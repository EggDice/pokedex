import type { HttpGet } from '../http';
import type { ListingFeature } from '../listing/listing-feature';
import { appStore } from '../app/app-store';
import { createListing } from '../listing/listing-feature';
import { createPokemonService } from '../pokemon/service';

type ExternalServices = {
  httpGet: HttpGet,
}

type InternalServices = {
  listing: ListingFeature,
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
  const store = appStore();
  const listing = createListing({ store, pokemonService });
  run({ listing })
}
