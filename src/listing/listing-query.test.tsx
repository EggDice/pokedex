import { coreMarbles } from '../core/marbles';
import { listingQuery } from './listing-query';
import type { AppStore } from '../app/app-store'
import type { ListingStatus } from './listing-store'

test('isListLoaded$ should be false if not loaded', coreMarbles((m) => {
  const { isListLoaded$ } = listingQuery({
    state$: m.cold('iadf', STATE_VALUES),
  } as unknown as AppStore);
  m.expect(isListLoaded$).toBeObservable(m.coldBoolean('fftt'));
}));

test('pokemons$ should give the list of pokemons', coreMarbles((m) => {
  const { pokemons$ } = listingQuery({
    state$: m.cold('0', { '0': { listing: { pokemons: [] } } }),
  } as unknown as AppStore);
  m.expect(pokemons$).toBeObservable(m.cold('0', { '0': [] }));
}));

const listingStatus = (value: ListingStatus) => ({
  listing: {
    listingStatus: value,
  },
})

const STATE_VALUES = {
  i: listingStatus('initial'),
  a: listingStatus('loading-list'),
  d: listingStatus('loading-details'),
  f: listingStatus('loaded'),
}

