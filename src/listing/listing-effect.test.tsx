import { listingEffect } from './listing-effect';
import { PokemonService } from '../pokemon/service';
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

const mockObservableReturn = (value: any) => of(value).pipe(delay(1));
