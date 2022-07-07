import { listingEffect } from './listing-effect';
import type { PokemonService } from '../pokemon/service';
import { coreMarbles } from '../core/marbles';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import type { ListingEvent } from './listing-store';
import { pokemonServiceFake as pokemonService } from '../pokemon/fake';

test('load pokemon list', coreMarbles((m) => {
  const effect = listingEffect(pokemonService);
  const event$ = m.cold('s', {
    s: { type: 'listing/fetchAll' } as ListingEvent,
  })
  const output$ = effect.handleFetchAll(event$).pipe(
    map(({ type, payload }) => ({ type, payload: payload.length })),
  );
  m.expect(output$).toBeObservable('-d', {
    d: { type: 'listing/listLoaded', payload: 151},
  })
}))

test('search pokemon list', coreMarbles((m) => {
  const effect = listingEffect(pokemonService);
  const event$ = m.cold('s', {
    s: { type: 'listing/search', payload: 'Bulbasaur' } as ListingEvent,
  })
  m.expect(effect.handleSearch(event$)).toBeObservable('-d', {
    d: {
      type: 'listing/listLoaded',
      payload: [{
        name: 'bulbasaur',
        id: 1,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      }]
    },
  })
}))

test('load pokemon list on empty search', coreMarbles((m) => {
  const effect = listingEffect(pokemonService);
  const event$ = m.cold('s', {
    s: { type: 'listing/search', payload: '' } as ListingEvent,
  });
  const output$ = effect.handleSearch(event$).pipe(
    map(({ type, payload }) => ({ type, payload: payload.length })),
  );
  m.expect(output$).toBeObservable('-d', {
    d: { type: 'listing/listLoaded', payload: 151 },
  })
}))

test('pick pokemon', coreMarbles((m) => {
  const effect = listingEffect(pokemonService);
  const event$ = m.cold('s', {
    s: { type: 'listing/select', payload: 1 } as ListingEvent,
  })
  m.expect(effect.handleSelect(event$)).toBeObservable('-d', {
    d: { type: 'listing/detailsLoaded', payload: {
      id: 1,
      name: 'bulbasaur',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      types: [ 'grass', 'poison' ],
      stats: [
        { name: 'hp', value: 45 },
        { name: 'attack', value: 49 },
        { name: 'defense', value: 49 },
        { name: 'special-attack', value: 65 },
        { name: 'special-defense', value: 65 },
        { name: 'speed', value: 45 },
      ],
    }},
  });
}));
