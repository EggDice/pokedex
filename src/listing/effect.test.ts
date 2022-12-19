import { listingEffect } from './effect'
import { coreMarbles } from '@core/marbles'
import { map } from 'rxjs/operators'
import { router } from '@/router'
import {
  createPokemonServiceFake,
  BULBASAUR,
  BULBASAUR_LISTED,
} from '@/pokemon/fake'
import { ListingEvent, ListingEventListLoaded, ListingEventFetchError, createFetchAll, createSearch, createSelect, createDetailsLoaded, createListLoaded, createListError } from './store'
import { of } from 'rxjs'
import { createAppNavigation, createPlatformNavigation } from '@/navigation'
import { StoreError } from '@core/store'

test('load pokemon list', coreMarbles(({ expect, cold }) => {
  const FETCH_ALL: ListingEvent = createFetchAll()
  const effect = listingEffect({ pokemonService, router })
  const event$ = cold('s', { s: FETCH_ALL })
  // We don't want to assert all the pokemons just the lenght of the list
  const output$ = effect.handleFetchAll(event$, STATE).pipe(
    map(payloadListToItsLength),
  )
  expect(output$).toBeObservable('-d', {
    d: createListLoadedFromLength(151),
  })
}))

test('load pokemon list error', coreMarbles(({ expect, cold }) => {
  const error = new Error('Failed to fetch')
  const pokemonService = createPokemonServiceFake({
    getAllPokemon: {
      type: 'observable',
      error,
    },
  })
  const FETCH_ALL: ListingEvent = createFetchAll()
  const effect = listingEffect({ pokemonService, router })
  const event$ = cold('s', { s: FETCH_ALL })
  // We don't want to assert the trace of the error just the message
  const output$ = effect.handleFetchAll(event$, STATE).pipe(
    map(payloadErrorToItsMessage),
  )
  expect(output$).toBeObservable('-(e|)', {
    e: createListErrorFromMessage('Failed to fetch pokemon list'),
  })
}))

test('search pokemon list', coreMarbles(({ expect, cold }) => {
  const SEARCH_BULBASAUR: ListingEvent = createSearch('Bulbasaur')
  const effect = listingEffect({ pokemonService, router })
  const event$ = cold('s', { s: SEARCH_BULBASAUR })
  expect(effect.handleSearch(event$, STATE)).toBeObservable('-d', {
    d: createListLoaded([BULBASAUR_LISTED]),
  })
}))

test('load pokemon list on empty search', coreMarbles(({ expect, cold }) => {
  const SEARCH_EMPTY: ListingEvent = createSearch('')
  const effect = listingEffect({ pokemonService, router })
  const event$ = cold('s', { s: SEARCH_EMPTY })
  // We don't want to assert all the pokemons just the lenght of the list
  const output$ = effect.handleSearch(event$, STATE).pipe(
    map(payloadListToItsLength),
  )
  expect(output$).toBeObservable('-d', {
    d: createListLoadedFromLength(151),
  })
}))

test('pick pokemon', coreMarbles(({ expect, cold }) => {
  const SELECT_BULBASAUR: ListingEvent = createSelect(1)
  const effect = listingEffect({ pokemonService, router })
  const event$ = cold('s', { s: SELECT_BULBASAUR })
  expect(effect.handleSelect(event$, STATE)).toBeObservable('-(dl)', {
    d: createDetailsLoaded(BULBASAUR),
    l: createAppNavigation({
      pathname: '/pokemon/1',
      search: '',
      hash: '',
    }),
  })
}))

test('don\'t load pokemon 0', coreMarbles(({ expect, cold }) => {
  const SELECT_EMPTY: ListingEvent = createSelect(0)
  const effect = listingEffect({ pokemonService, router })
  const event$ = cold('s', { s: SELECT_EMPTY })
  expect(effect.handleSelect(event$, STATE)).toBeObservable('', {})
}))

test('handle select route', coreMarbles(({ expect, cold }) => {
  const LOCATION = {
    pathname: '/pokemon/1',
    search: '',
    hash: '',
  }
  const SELECT_NAVIGATION: ListingEvent = createPlatformNavigation(LOCATION)
  const SELECT_BULBASAUR: ListingEvent = createSelect(1)
  const effect = listingEffect({ pokemonService, router })
  const event$ = cold('s', { s: SELECT_NAVIGATION })
  expect(effect.handleSelectRoute(event$, STATE)).toBeObservable('s', {
    s: SELECT_BULBASAUR,
  })
}))

const pokemonService = createPokemonServiceFake()

const STATE = of(undefined)

const payloadListToItsLength = (event: ListingEvent): { type: string, payload: number } =>
  ({ ...event, payload: (event as ListingEventListLoaded).payload.length })

const payloadErrorToItsMessage = (event: ListingEvent): { type: string, payload: string } =>
  ({ ...event, payload: (event as ListingEventFetchError).payload.message })

const createListLoadedFromLength = (length: number): { type: string, payload: number } => ({
  type: createListLoaded([]).type, // To not hard-code the event type here
  payload: length,
})

const createListErrorFromMessage = (message: string): { type: string, payload: string } => ({
  type: createListError({} as StoreError).type, // To not hard-code the event type here
  payload: message,
})
