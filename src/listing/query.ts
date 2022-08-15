import { map, distinctUntilChanged } from 'rxjs/operators'
import type { AppStateReadable } from '../app/app-store'
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
}

export const listingQuery = (store: AppStateReadable): ListingQuery => ({
  isListLoaded$:
      store.state$.pipe(map(getListingStatus),
        distinctUntilChanged(),
        map((listingStatus) => listingStatus !== 'loading-list' && listingStatus !== 'initial'),
      ),
  isDetailsLoaded$: store.state$.pipe(
    map(getListingStatus),
    distinctUntilChanged(),
    map((listingStatus) => listingStatus !== 'loading-details' && listingStatus !== 'initial'),
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
    distinctUntilChanged(),
    map(selectedPokemon => selectedPokemon > 0),
  ),
  details$: store.state$.pipe(
    map(({ listing: { details } }) => details),
    distinctUntilChanged(),
  ),
})

const getListingStatus = ({
  listing: {
    listingStatus,
  },
}: { listing: ListingState }): ListingStatus => listingStatus
