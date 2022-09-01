import type { PokemonService } from '@/pokemon'
import { of } from 'rxjs'
import { switchMap, map, filter } from 'rxjs/operators'
import { filterByType } from '@core/effect'
import type { CoreEffectFunction } from '@core/effect'
import { listLoadedCreator, detailsLoadedCreator } from './store'
import type { ListingEvent } from './store'
import type { NavigationEventPlatformNavigation, Router } from '@/navigation'

interface ListingEffect<
  APP_STORE_EVENT extends ListingEvent,
> {
  handleFetchAll: CoreEffectFunction<APP_STORE_EVENT>
  handleSearch: CoreEffectFunction<APP_STORE_EVENT>
  handleSelect: CoreEffectFunction<APP_STORE_EVENT>
  handleSelectRoute: CoreEffectFunction<APP_STORE_EVENT>
}

interface ListingEffectArgs {
  pokemonService: PokemonService
  router: Router
}

export const listingEffect =
  <
    APP_STORE_EVENT extends ListingEvent,
  > ({ pokemonService, router }: ListingEffectArgs): ListingEffect<APP_STORE_EVENT | ListingEvent> => {
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
        filter((payload) => payload !== 0),
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

    const handleSelectRoute: CoreEffectFunction<ListingEvent> = (event$) =>
      event$.pipe(
        filterByType('navigation/platformNavigation'),
        map(
          (event: NavigationEventPlatformNavigation) =>
            router.match(event.payload, 'SELECT_POKEMON'),
        ),
        filter((route) => route !== undefined),
        map((route) => ({
          type: 'listing/select',
          payload: Number(route?.params.id),
        })),
      )

    return {
      handleFetchAll,
      handleSearch,
      handleSelect,
      handleSelectRoute,
    }
  }
