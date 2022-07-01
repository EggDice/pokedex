import type { PokemonService } from '../pokemon/service';
import type { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { filterByType } from '../core/effect';
import { listLoadedCreator } from './listing-store';
import type { ListingEvent } from './listing-store';

export const listingEffect = (pokemonService: PokemonService) => {
  const handleFetchAll = (event$: Observable<ListingEvent>) =>
    event$.pipe(
      filterByType('listing/fetchAll'),
      switchMap(pokemonService.getAllPokemon),
      map(listLoadedCreator)
    )

  return {
    handleFetchAll,
  };
}
