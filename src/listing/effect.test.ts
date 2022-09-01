import { listingEffect } from './effect'
import { coreMarbles } from '@core/marbles'
import { map } from 'rxjs/operators'
import { router } from '@/router'
import {
  pokemonServiceFake as pokemonService,
  BULBASAUR,
  BULBASAUR_LISTED,
} from '../pokemon/fake'
import type { ListingEvent, ListingEventListLoaded } from './store'

test('load pokemon list', coreMarbles(({ expect, cold }) => {
  const FETCH_ALL: ListingEvent = { type: 'listing/fetchAll' }
  const effect = listingEffect({ pokemonService, router })
  const event$ = cold('s', { s: FETCH_ALL })
  const output$ = effect.handleFetchAll(event$).pipe(
    map(payloadListToItsLength),
  )
  expect(output$).toBeObservable('-d', {
    d: { type: 'listing/listLoaded', payload: 151 },
  })
}))

test('search pokemon list', coreMarbles(({ expect, cold }) => {
  const SEARCH_BULBASAUR: ListingEvent = { type: 'listing/search', payload: 'Bulbasaur' }
  const effect = listingEffect({ pokemonService, router })
  const event$ = cold('s', { s: SEARCH_BULBASAUR })
  expect(effect.handleSearch(event$)).toBeObservable('-d', {
    d: {
      type: 'listing/listLoaded',
      payload: [BULBASAUR_LISTED],
    },
  })
}))

test('load pokemon list on empty search', coreMarbles(({ expect, cold }) => {
  const SEARCH_EMPTY: ListingEvent = { type: 'listing/search', payload: '' }
  const effect = listingEffect({ pokemonService, router })
  const event$ = cold('s', { s: SEARCH_EMPTY })
  const output$ = effect.handleSearch(event$).pipe(
    map(payloadListToItsLength),
  )
  expect(output$).toBeObservable('-d', {
    d: { type: 'listing/listLoaded', payload: 151 },
  })
}))

test('pick pokemon', coreMarbles(({ expect, cold }) => {
  const SELECT_BULBASAUR: ListingEvent = { type: 'listing/select', payload: 1 }
  const effect = listingEffect({ pokemonService, router })
  const event$ = cold('s', { s: SELECT_BULBASAUR })
  expect(effect.handleSelect(event$)).toBeObservable('-(dl)', {
    d: {
      type: 'listing/detailsLoaded',
      payload: BULBASAUR,
    },
    l: {
      type: 'navigation/appNavigation',
      payload: {
        pathname: '/pokemon/1',
        search: '',
        hash: '',
      },
    },
  })
}))

test('don\'t load pokemon 0', coreMarbles(({ expect, cold }) => {
  const SELECT_EMPTY: ListingEvent = { type: 'listing/select', payload: 0 }
  const effect = listingEffect({ pokemonService, router })
  const event$ = cold('s', { s: SELECT_EMPTY })
  expect(effect.handleSelect(event$)).toBeObservable('', {})
}))

test('handle select route', coreMarbles(({ expect, cold }) => {
  const LOCATION = {
    pathname: '/pokemon/1',
    search: '',
    hash: '',
  }
  const SELECT_NAVIGATION: ListingEvent = {
    type: 'navigation/platformNavigation',
    payload: LOCATION,
  }
  const SELECT_BULBASAUR: ListingEvent = { type: 'listing/select', payload: 1 }
  const effect = listingEffect({ pokemonService, router })
  const event$ = cold('s', { s: SELECT_NAVIGATION })
  expect(effect.handleSelectRoute(event$)).toBeObservable('s', {
    s: SELECT_BULBASAUR,
  })
}))

const payloadListToItsLength = (event: ListingEvent): { type: string, payload: number } =>
  ({ ...event, payload: (event as ListingEventListLoaded).payload.length })
