import { map } from 'rxjs/operators';
import type { AppStore } from '../app/app-store';
import type { ListingState } from './listing-store'

export const listingQuery = (store: AppStore) =>
  ({
    isListLoaded$: store.state$.pipe(
      map(getListingStatus),
      map((listingStatus) => listingStatus !== 'loading-list' && listingStatus !== 'initial'),
    ),
    isDetailsLoaded$: store.state$.pipe(
      map(getListingStatus),
      map((listingStatus) => listingStatus !== 'loading-details' && listingStatus !== 'initial'),
    ),
    pokemons$: store.state$.pipe(
      map(({ listing: { pokemons }}) => pokemons)
    ),
    searchTerm$: store.state$.pipe(
      map(({ listing: { searchTerm }}) => searchTerm)
    ),
    isModalOpen$: store.state$.pipe(
      map(({ listing: { selectedPokemon }}) => selectedPokemon > 0)
    ),
    details$: store.state$.pipe(
      map(({ listing: { details }}) => details)
    ),
  })

const getListingStatus = ({
  listing: {
    listingStatus,
  },
}: { listing: ListingState }) => listingStatus

