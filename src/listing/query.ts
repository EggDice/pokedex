import { map, distinctUntilChanged } from 'rxjs/operators'
import type { StateReadable } from '@core/store'
import { AppStoreListingStateSlice, stateToListing } from './store'
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

export const listingQuery = (store: StateReadable<AppStoreListingStateSlice>): ListingQuery => ({
  isListLoaded$: store.state$.pipe(
    map(stateToListing),
    map(({ listingStatus }) => listingStatus === 'loaded' || listingStatus === 'loading-details'),
    distinctUntilChanged(),
  ),
  isDetailsLoaded$: store.state$.pipe(
    map(stateToListing),
    map(({ listingStatus }) => listingStatus === 'loaded'),
    distinctUntilChanged(),
  ),
  pokemons$: store.state$.pipe(
    map(stateToListing),
    map(({ pokemons }) => pokemons),
    distinctUntilChanged(),
  ),
  searchTerm$: store.state$.pipe(
    map(stateToListing),
    map(({ searchTerm }) => searchTerm),
    distinctUntilChanged(),
  ),
  isModalOpen$: store.state$.pipe(
    map(stateToListing),
    map(({ selectedPokemon }) => selectedPokemon),
    map(selectedPokemon => selectedPokemon > 0),
    distinctUntilChanged(),
  ),
  details$: store.state$.pipe(
    map(stateToListing),
    map(({ details }) => details),
    distinctUntilChanged(),
  ),
  isError$: store.state$.pipe(
    map(stateToListing),
    map(({ listingStatus }) => listingStatus === 'loading-error'),
    distinctUntilChanged(),
  ),
})
