import type { PokemonService } from '@/pokemon'
import { of } from 'rxjs'
import { switchMap, map, filter, catchError } from 'rxjs/operators'
import { CoreEffect, filterByType } from '@core/effect'
import type { CoreEffectFunction } from '@core/effect'
import { createStoreError } from '@core/store'
import { createListLoaded, createDetailsLoaded, createListError, createSelect } from './store'
import type { ListingEvent } from './store'
import { createAppNavigation, NavigationEventPlatformNavigation, Router } from '@/navigation'
import { LISTING_NAMESPACE } from './config'
import { NAVIGATION_NAMESPACE } from '@/navigation/config'

type Effects =
  | 'handleFetchAll'
  | 'handleSearch'
  | 'handleSelect'
  | 'handleSelectRoute'

type ListingEffect<
  APP_STORE_STATE,
  APP_STORE_EVENT extends ListingEvent,
> = CoreEffect<APP_STORE_STATE, APP_STORE_EVENT, Effects>

interface ListingEffectArgs {
  pokemonService: PokemonService
  router: Router
}

export const listingEffect =
  <
    APP_STORE_STATE,
  > ({ pokemonService, router }: ListingEffectArgs):
  ListingEffect<APP_STORE_STATE, ListingEvent> => {
    type EffectFunction = CoreEffectFunction<APP_STORE_STATE, ListingEvent>
    const handleFetchAll: EffectFunction = (event$) =>
      event$.pipe(
        filterByType(`${LISTING_NAMESPACE}/fetchAll`),
        switchMap(pokemonService.getAllPokemon),
        map(createListLoaded),
        catchError(() => of(createListError(createStoreError('Failed to fetch pokemon list')))),
      )

    const handleSearch: EffectFunction = (event$) =>
      event$.pipe(
        filterByType(`${LISTING_NAMESPACE}/search`),
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
          createListLoaded(term),
        )),
      )

    const handleSelect: EffectFunction = (event$) =>
      event$.pipe(
        filterByType(`${LISTING_NAMESPACE}/select`),
        map(({ payload }) => payload),
        filter((payload) => payload !== 0),
        switchMap(pokemonService.getPokemonById),
        map(p => p ?? { name: '', types: [], stats: [], id: 0, image: '' }),
        switchMap((pokemon) => of(
          createDetailsLoaded(pokemon),
          createAppNavigation({
            pathname: `/pokemon/${pokemon.id}`,
            search: '',
            hash: '',
          }),
        )),
      )

    const handleSelectRoute: EffectFunction = (event$) =>
      event$.pipe(
        filterByType(`${NAVIGATION_NAMESPACE}/platformNavigation`),
        map(
          (event: NavigationEventPlatformNavigation) =>
            router.match(event.payload, 'SELECT_POKEMON'),
        ),
        filter((route) => route !== undefined),
        map((route) => createSelect(Number(route?.params.id))),
      )

    return {
      handleFetchAll,
      handleSearch,
      handleSelect,
      handleSelectRoute,
    }
  }
