import type { PokemonService } from '@/pokemon'
import type { Observable } from 'rxjs'
import { of } from 'rxjs'
import { switchMap, map } from 'rxjs/operators'
import { filterByType } from '@core/effect'
import { listLoadedCreator, detailsLoadedCreator } from './store'
import type { ListingEvent, ListingEventListLoaded, ListingEventDetailsLoaded } from './store'

interface ListingEffect {
  handleFetchAll: (event$: Observable<ListingEvent>) => Observable<ListingEventListLoaded>
  handleSearch: (event$: Observable<ListingEvent>) => Observable<ListingEventListLoaded>
  handleSelect: (event$: Observable<ListingEvent>) => Observable<ListingEventDetailsLoaded>
}

export const listingEffect = (pokemonService: PokemonService): ListingEffect => {
  const handleFetchAll = (event$: Observable<ListingEvent>): Observable<ListingEventListLoaded> =>
    event$.pipe(
      filterByType<ListingEvent>('listing/fetchAll'),
      switchMap(pokemonService.getAllPokemon),
      map(listLoadedCreator),
    )

  const handleSearch = (event$: Observable<ListingEvent>): Observable<ListingEventListLoaded> =>
    event$.pipe(
      filterByType<ListingEvent>('listing/search'),
      map(({ payload }) => payload),
      map((term: string) => term.toLowerCase()),
      switchMap((term: string) =>
        term !== ''
          ? of(term).pipe(
            switchMap(pokemonService.getPokemonByName),
            map((p) => (p != null) ? [{ id: p.id, name: p.name, image: p.image }] : []),
          )
          : of(term).pipe(
            switchMap(pokemonService.getAllPokemon),
          ),
      ),
      map(listLoadedCreator),
    )

  const handleSelect = (event$: Observable<ListingEvent>): Observable<ListingEventDetailsLoaded> =>
    event$.pipe(
      filterByType<ListingEvent>('listing/select'),
      map(({ payload }) => payload),
      switchMap(pokemonService.getPokemonById),
      map(p => p ?? { name: '', types: [], stats: [], id: 0, image: '' }),
      map(detailsLoadedCreator),
    )

  return {
    handleFetchAll,
    handleSearch,
    handleSelect,
  }
}
