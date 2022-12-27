import {
  createPokemonService,
} from './'
import type { Pokemon } from './'

import { map } from 'rxjs/operators'
import type { Observable } from 'rxjs'

import {
  BULBASAUR,
  BULBASAUR_LISTED,
} from './fake'
import { coreMarbles } from '@core/marbles'
import { pokemonApiClient } from './stub'

const pokemonService = createPokemonService(pokemonApiClient)

test('get all pokemon', coreMarbles(({ expect }) => {
  const pokemons$ = pokemonService.getAllPokemon()
  const image$ = pokemons$.pipe(map(([{ image }]) => image))
  expect(image$).toBeObservable('-(i|)', { i: BULBASAUR_LISTED.image })
  const id$ = pokemons$.pipe(map(([{ id }]) => id))
  expect(id$).toBeObservable('-(1|)', { 1: 1 })
  const name$ = pokemons$.pipe(map(([{ name }]) => name))
  expect(name$).toBeObservable('-(b|)', { b: 'bulbasaur' })
}))

test('get details on single pokemon by id', coreMarbles(({ expect }) => {
  const details$ = pokemonService.getPokemonById(1) as Observable<Pokemon>
  const name$ = details$.pipe(map(({ name }) => name))
  expect(name$).toBeObservable('-(b|)', { b: 'bulbasaur' })
  const types$ = details$.pipe(map(({ types }) => types))
  expect(types$).toBeObservable('-(t|)', { t: BULBASAUR.types })
  const stats$ = details$.pipe(map(({ stats }) => stats))
  expect(stats$).toBeObservable('-(s|)', { s: BULBASAUR.stats })
}))

test('get details on single pokemon by name', coreMarbles(({ expect }) => {
  const details$ = pokemonService.getPokemonByName('bulbasaur') as Observable<Pokemon>
  const name$ = details$.pipe(map(({ name }) => name))
  expect(name$).toBeObservable('-(b|)', { b: 'bulbasaur' })
  const types$ = details$.pipe(map(({ types }) => types))
  expect(types$).toBeObservable('-(t|)', { t: BULBASAUR.types })
  const stats$ = details$.pipe(map(({ stats }) => stats))
  expect(stats$).toBeObservable('-(s|)', { s: BULBASAUR.stats })
}))

test('get details on single pokemon by name if not found', coreMarbles(({ expect }) => {
  const details$ = pokemonService.getPokemonByName('not exist')
  expect(details$).toBeObservable('-(0|)', { 0: undefined })
}))
