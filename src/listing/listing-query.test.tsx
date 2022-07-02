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

test('isDetailsLoaded$ should be false if not loaded', coreMarbles((m) => {
  const { isDetailsLoaded$ } = listingQuery({
    state$: m.cold('iadf', STATE_VALUES),
  } as unknown as AppStore);
  m.expect(isDetailsLoaded$).toBeObservable(m.coldBoolean('ftft'));
}));

test('isDetailsLoaded$ should be false if not loaded', coreMarbles((m) => {
  const { isModalOpen$ } = listingQuery({
    state$: m.cold('01', {
      '0': { listing: { selectedPokemon: 0 } },
      '1': { listing: { selectedPokemon: 1 } },
    }),
  } as unknown as AppStore);
  m.expect(isModalOpen$).toBeObservable(m.coldBoolean('ft'));
}));

test('pokemons$ should give the list of pokemons', coreMarbles((m) => {
  const { pokemons$ } = listingQuery({
    state$: m.cold('0', { '0': { listing: { pokemons: [] } } }),
  } as unknown as AppStore);
  m.expect(pokemons$).toBeObservable(m.cold('0', { '0': [] }));
}));

test('searchTerm$ should give the last searched term', coreMarbles((m) => {
  const { searchTerm$ } = listingQuery({
    state$: m.cold('0', { '0': { listing: { searchTerm: 'hello' } } }),
  } as unknown as AppStore);
  m.expect(searchTerm$).toBeObservable(m.cold('0', { '0': 'hello' }));
}));

test('details$ should give the last searched term', coreMarbles((m) => {
  const { details$ } = listingQuery({
    state$: m.cold('0', { '0': { listing: { details: undefined } } }),
  } as unknown as AppStore);
  m.expect(details$).toBeObservable(m.cold('0', { '0': undefined }));
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

