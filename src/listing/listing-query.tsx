import { map } from 'rxjs/operators';
import type { AppStore } from '../app/app-store';
import type { ListingState } from './listing-store'

export const listingQuery = (store: AppStore) =>
  ({
    isListLoaded$: store.state$.pipe(
      map(getListingStatus),
      map((listingStatus) => listingStatus !== 'loading-list' && listingStatus !== 'initial'),
    ),
    pokemons$: store.state$.pipe(
      map(({ listing: { pokemons }}) => pokemons)
    ),
  })

const getListingStatus = ({
  listing: {
    listingStatus,
  },
}: { listing: ListingState }) => listingStatus

