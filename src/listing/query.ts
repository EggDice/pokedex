import { map, distinctUntilChanged } from 'rxjs/operators'
import type { StateReadable } from '@core/store'
import type { ListingState, ListingStatus } from './store'
import type { Observable } from 'rxjs'
import type { Pokemon, ListedPokemon } from '@/pokemon'

export interface ListingQuery {
  isListLoaded$: Observable<boolean>
  isDetailsLoaded$: Observable<boolean>
  pokemons$: Observable<ListedPokemon[]>
  searchTerm$: Observable<string>
  isModalOpen$: Observable<boolean>
  details$: Observable<Pokemon | undefined>
  isError$: Observable<boolean>
}

export const listingQuery = (store: StateReadable<{ listing: ListingState }>): ListingQuery => ({
  isListLoaded$: store.state$.pipe(
    map(getListingStatus),
    map((listingStatus) => listingStatus === 'loaded' || listingStatus === 'loading-details'),
    distinctUntilChanged(),
  ),
  isDetailsLoaded$: store.state$.pipe(
    map(getListingStatus),
    map((listingStatus) => listingStatus === 'loaded'),
    distinctUntilChanged(),
  ),
  pokemons$: store.state$.pipe(
    map(({ listing: { pokemons } }) => pokemons),
    distinctUntilChanged(),
  ),
  searchTerm$: store.state$.pipe(
    map(({ listing: { searchTerm } }) => searchTerm),
    distinctUntilChanged(),
  ),
  isModalOpen$: store.state$.pipe(
    map(({ listing: { selectedPokemon } }) => selectedPokemon),
    map(selectedPokemon => selectedPokemon > 0),
    distinctUntilChanged(),
  ),
  details$: store.state$.pipe(
    map(({ listing: { details } }) => details),
    distinctUntilChanged(),
  ),
  isError$: store.state$.pipe(
    map(getListingStatus),
    map((listingStatus) => listingStatus === 'loading-error'),
    distinctUntilChanged(),
  ),
})

const getListingStatus = ({
  listing: {
    listingStatus,
  },
}: { listing: ListingState }): ListingStatus => listingStatus
