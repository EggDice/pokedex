import type { PokemonService } from '../pokemon/service';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { filterByType } from '../core/effect';
import { listLoadedCreator, detailsLoadedCreator } from './listing-store';
import type { ListingEvent } from './listing-store';

export const listingEffect = (pokemonService: PokemonService) => {
  const handleFetchAll = (event$: Observable<ListingEvent>) =>
    event$.pipe(
      filterByType<ListingEvent>('listing/fetchAll'),
      switchMap(pokemonService.getAllPokemon),
      map(listLoadedCreator),
    )

  const handleSearch = (event$: Observable<ListingEvent>) =>
    event$.pipe(
      filterByType<ListingEvent>('listing/search'),
      map(({ payload }) => payload),
      map((term: string) => term.toLowerCase()),
      switchMap((term: string) =>
        term !== '' ?
          of(term).pipe(
            switchMap(pokemonService.getPokemonByName),
            map((p) => p ? [{ id: p.id , name: p.name, image: p.image }] : []),
          ) :
          of(term).pipe(
            switchMap(pokemonService.getAllPokemon),
          )
      ),
      map(listLoadedCreator),
    )

  const handleSelect = (event$: Observable<ListingEvent>) =>
    event$.pipe(
      filterByType<ListingEvent>('listing/select'),
      map(({ payload }) => payload),
      switchMap(pokemonService.getPokemonById),
      map(p => p ?? { name: '', types: [], stats: [] }),
      map(detailsLoadedCreator),
    )


  return {
    handleFetchAll,
    handleSearch,
    handleSelect,
  };
}
