import { createCoreStoreSlice } from '../core/store';
import type {
  PayloadStoreEvent,
  StoreEvent,
  CoreStoreSlice,
} from '../core/store';

export type ListingStatus =
  | 'initial'
  | 'loading-list'
  | 'loading-details'
  | 'loaded';

type ListedPokemon = {
  name: string,
  image: string,
  id: number,
}

type Stat = {
  name: string,
  value: number,
}

type PokemonDetails = {
  name: string,
  types: string[],
  stats: Stat[],
}

export type ListingState = {
  listingStatus: ListingStatus,
  searchTerm: string,
  pokemons: ListedPokemon[],
  selectedPokemon: number,
  details: PokemonDetails | undefined,
}

export type ListingEventFetcAll = StoreEvent<'listing/fetchAll'>;

export type ListingEventListLoaded =
  PayloadStoreEvent<'listing/listLoaded', ListedPokemon[]>;

export type ListingEventSearch =
  PayloadStoreEvent<'listing/search', string>;

export type ListingEventSelect =
  PayloadStoreEvent<'listing/search', number>;

export type ListingEventDetailsLoaded =
  PayloadStoreEvent<'listing/detailsLoaded', PokemonDetails>;

export type ListingEvent =
  | ListingEventFetcAll
  | ListingEventListLoaded
  | ListingEventSearch
  | ListingEventSelect
  | ListingEventDetailsLoaded;

const fetchAll = (state: ListingState, event: ListingEventFetcAll) => ({
  ...state,
  listingStatus: 'loading-list' as const,
})

const listLoaded = (state: ListingState, event: ListingEventListLoaded) => ({
  ...state,
  listingStatus: 'loaded' as const,
  pokemons: event.payload,
});

const search = (state: ListingState, event: ListingEventSearch) => ({
  ...state,
  listingStatus: 'loading-list' as const,
  searchTerm: event.payload,
});

const select = (state: ListingState, event: ListingEventSelect) => ({
  ...state,
  listingStatus: 'loading-details' as const,
  selectedPokemon: event.payload,
});

const detailsLoaded = (state: ListingState, event: ListingEventDetailsLoaded) => ({
  ...state,
  listingStatus: 'loaded' as const,
  details: event.payload,
});

const reducers = {
  fetchAll,
  listLoaded,
  search,
  select,
  detailsLoaded,
};

const initialState: ListingState = {
  listingStatus: 'initial' as ListingStatus,
  searchTerm: '',
  pokemons: [],
  selectedPokemon: 0,
  details: undefined,
};

export const listingSlice: CoreStoreSlice<ListingState, typeof reducers> =
  createCoreStoreSlice({
    name: 'listing',
    initialState,
    reducers,
  })

export const {
  eventCreators: {
    fetchAll: fetchAllCreator,
    listLoaded: listLoadedCreator,
  }
} = listingSlice;
