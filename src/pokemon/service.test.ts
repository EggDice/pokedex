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
import { httpGet } from '@/http'
import { httpGetFake } from '@/http/fake'

const pokemonService = createPokemonService(httpGetFake)

test('smoke for injecting real dependencies', () => {
  createPokemonService(httpGet)
})

test('get all pokemon', coreMarbles((m) => {
  const pokemons$ = pokemonService.getAllPokemon()
  const image$ = pokemons$.pipe(map(([{ image }]) => image))
  m.expect(image$).toBeObservable('-(i|)', { i: BULBASAUR_LISTED.image })
  const id$ = pokemons$.pipe(map(([{ id }]) => id))
  m.expect(id$).toBeObservable('-(1|)', { 1: 1 })
  const name$ = pokemons$.pipe(map(([{ name }]) => name))
  m.expect(name$).toBeObservable('-(b|)', { b: 'bulbasaur' })
}))

test('get details on single pokemon by id', coreMarbles((m) => {
  const details$ = pokemonService.getPokemonById(1) as Observable<Pokemon>
  const name$ = details$.pipe(map(({ name }) => name))
  m.expect(name$).toBeObservable('-(b|)', { b: 'bulbasaur' })
  const types$ = details$.pipe(map(({ types }) => types))
  m.expect(types$).toBeObservable('-(t|)', { t: BULBASAUR.types })
  const stats$ = details$.pipe(map(({ stats }) => stats))
  m.expect(stats$).toBeObservable('-(s|)', { s: BULBASAUR.stats })
}))

test('get details on single pokemon by name', coreMarbles((m) => {
  const details$ = pokemonService.getPokemonByName('bulbasaur') as Observable<Pokemon>
  const name$ = details$.pipe(map(({ name }) => name))
  m.expect(name$).toBeObservable('-(b|)', { b: 'bulbasaur' })
  const types$ = details$.pipe(map(({ types }) => types))
  m.expect(types$).toBeObservable('-(t|)', { t: BULBASAUR.types })
  const stats$ = details$.pipe(map(({ stats }) => stats))
  m.expect(stats$).toBeObservable('-(s|)', { s: BULBASAUR.stats })
}))

test('get details on single pokemon by name if not found', coreMarbles((m) => {
  const details$ = pokemonService.getPokemonByName('not exist')
  m.expect(details$).toBeObservable('-(0|)', { 0: undefined })
}))
