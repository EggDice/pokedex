import { listingEffect } from './listing-effect';
import type { PokemonService } from '../pokemon/service';
import { coreMarbles } from '../core/marbles';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import type { ListingEvent } from './listing-store';

test('load pokemon list', coreMarbles((m) => {
  const pokemonServiceStub = {
    getAllPokemon: () => mockObservableReturn([]),
  } as unknown as PokemonService;
  const effect = listingEffect(pokemonServiceStub);
  const event$ = m.cold('s', {
    s: { type: 'listing/fetchAll' } as ListingEvent,
  })
  m.expect(effect.handleFetchAll(event$)).toBeObservable('-d', {
    d: { type: 'listing/listLoaded', payload: []},
  })
}))

test('search pokemon list', coreMarbles((m) => {
  const pokemonServiceStub = {
    getPokemonByName: () => mockObservableReturn({
      name: 'bulbasaur',
      id: 1,
      image: 'source',
    }),
  } as unknown as PokemonService;
  const effect = listingEffect(pokemonServiceStub);
  const event$ = m.cold('s', {
    s: { type: 'listing/search', payload: 'Bulbasour' } as ListingEvent,
  })
  m.expect(effect.handleSearch(event$)).toBeObservable('-d', {
    d: {
      type: 'listing/listLoaded',
      payload: [{ name: 'bulbasaur', id: 1, image: 'source' }]
    },
  })
}))

test('load pokemon list on empty search', coreMarbles((m) => {
  const pokemonServiceStub = {
    getAllPokemon: () => mockObservableReturn([]),
  } as unknown as PokemonService;
  const effect = listingEffect(pokemonServiceStub);
  const event$ = m.cold('s', {
    s: { type: 'listing/search', payload: '' } as ListingEvent,
  })
  m.expect(effect.handleSearch(event$)).toBeObservable('-d', {
    d: { type: 'listing/listLoaded', payload: []},
  })
}))

test('pick pokemon', coreMarbles((m) => {
  const pokemonServiceStub = {
    getPokemonById: () => mockObservableReturn({
      name: 'bulbasaur', types: [], stats: [],
    }),
  } as unknown as PokemonService;
  const effect = listingEffect(pokemonServiceStub);
  const event$ = m.cold('s', {
    s: { type: 'listing/select', payload: 1 } as ListingEvent,
  })
  m.expect(effect.handleSelect(event$)).toBeObservable('-d', {
    d: { type: 'listing/detailsLoaded', payload: {
      name: 'bulbasaur', types: [], stats: [],
    }},
  })
}))


const mockObservableReturn = (value: any) => of(value).pipe(delay(1));
