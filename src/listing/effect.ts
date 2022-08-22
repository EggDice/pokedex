import type { PokemonService } from '@/pokemon'
import { of } from 'rxjs'
import { switchMap, map } from 'rxjs/operators'
import { filterByType } from '@core/effect'
import type { CoreEffectFunction } from '@core/effect'
import { listLoadedCreator, detailsLoadedCreator } from './store'
import type { ListingEvent } from './store'

interface ListingEffect<
  APP_STORE_EVENT extends ListingEvent,
> {
  handleFetchAll: CoreEffectFunction<APP_STORE_EVENT>
  handleSearch: CoreEffectFunction<APP_STORE_EVENT>
  handleSelect: CoreEffectFunction<APP_STORE_EVENT>
}

export const listingEffect =
  <
    APP_STORE_EVENT extends ListingEvent,
  > (pokemonService: PokemonService): ListingEffect<APP_STORE_EVENT | ListingEvent> => {
    const handleFetchAll: CoreEffectFunction<ListingEvent> = (event$) =>
      event$.pipe(
        filterByType('listing/fetchAll'),
        switchMap(pokemonService.getAllPokemon),
        map(listLoadedCreator),
      )

    const handleSearch: CoreEffectFunction<ListingEvent> = (event$) =>
      event$.pipe(
        filterByType('listing/search'),
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
        switchMap((term) => of(
          listLoadedCreator(term),
        )),
      )

    const handleSelect: CoreEffectFunction<ListingEvent> = (event$) =>
      event$.pipe(
        filterByType('listing/select'),
        map(({ payload }) => payload),
        switchMap(pokemonService.getPokemonById),
        map(p => p ?? { name: '', types: [], stats: [], id: 0, image: '' }),
        switchMap((pokemon) => of(
          detailsLoadedCreator(pokemon),
          {
            type: 'navigation/appNavigation' as const,
            payload: {
              pathname: `/pokemon/${pokemon.id}`,
              search: '',
              hash: '',
            },
          },
        )),
      )

    return {
      handleFetchAll,
      handleSearch,
      handleSelect,
    }
  }
