import { listingSlice } from './listing-store';
import { coreMarbles } from '../core/marbles';
import { createCoreStore } from '../core/store';

test('Default state is loading', coreMarbles((m) => {
  const store = createCoreStore({ listing: listingSlice.reducer });
  m.expect(store.state$).toBeObservable('L', {
    L: {
      listing: {
        listingStatus: 'initial' as const,
        searchTerm: '',
        pokemons: [],
        selectedPokemon: 0,
        details: undefined,
      },
    },
  });
}));

test('Start loading pokemons', () => {
  const { reducer, eventCreators: { fetchAll } } = listingSlice;
  const initialState = {
    listingStatus: 'initial' as const,
    searchTerm: '',
    pokemons: [],
    selectedPokemon: 0,
    details: undefined,
  };
  const state = reducer(initialState, fetchAll());
  expect(state).toEqual({
    listingStatus: 'loading-list',
    searchTerm: '',
    pokemons: [],
    selectedPokemon: 0,
    details: undefined,
  });
});

test('Finish loading pokemons', () => {
  const { reducer, eventCreators: { listLoaded } } = listingSlice;
  const initialState = {
    listingStatus: 'initial' as const,
    searchTerm: '',
    pokemons: [],
    selectedPokemon: 0,
    details: undefined,
  };
  const state = reducer(initialState, listLoaded([
    { name: 'bulbasour', image: 'src', id: 1 },
  ]));
  expect(state).toEqual({
    listingStatus: 'loaded',
    searchTerm: '',
    pokemons: [ { name: 'bulbasour', image: 'src', id: 1 } ],
    selectedPokemon: 0,
    detials: undefined,
  });
});

test('Start searching', () => {
  const { reducer, eventCreators: { search } } = listingSlice;
  const initialState = {
    listingStatus: 'initial' as const,
    searchTerm: '',
    pokemons: [],
    selectedPokemon: 0,
    details: undefined,
  };
  const state = reducer(initialState, search('bulbasour'));
  expect(state).toEqual({
    listingStatus: 'loading-list',
    searchTerm: 'bulbasour',
    pokemons: [],
    selectedPokemon: 0,
    details: undefined,
  });
});

test('Select pokemon', () => {
  const { reducer, eventCreators: { select } } = listingSlice;
  const initialState = {
    listingStatus: 'initial' as const,
    searchTerm: '',
    pokemons: [],
    selectedPokemon: 0,
    details: undefined,
  };
  const state = reducer(initialState, select(1));
  expect(state).toEqual({
    listingStatus: 'loading-details',
    searchTerm: '',
    pokemons: [],
    selectedPokemon: 1,
    details: undefined,
  });
});

test('Select pokemon loaded', () => {
  const { reducer, eventCreators: { detailsLoaded } } = listingSlice;
  const initialState = {
    listingStatus: 'loading-details' as const,
    searchTerm: '',
    pokemons: [],
    selectedPokemon: 1,
    details: undefined,
  };
  const state = reducer(initialState, detailsLoaded({
    name: 'bulbasour', types: [], stats: [], image: '', id: 1,
  }));
  expect(state).toEqual({
    listingStatus: 'loaded',
    searchTerm: '',
    pokemons: [],
    selectedPokemon: 1,
    details: {
      name: 'bulbasour',
      types: [],
      stats: [],
      image: '',
      id: 1,
    },
  });
});
