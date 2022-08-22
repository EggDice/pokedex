import { createCoreStoreSlice } from '@core/store'
import type {
  PayloadStoreEvent,
  StoreEvent,
  CoreEvent,
  CoreStoreSlice,
} from '@core/store'
import type {
  Pokemon,
  ListedPokemon,
} from '@/pokemon'
import type {
  NavigationEventAppNavigation,
} from '@/navigation'

export type ListingStatus =
  | 'initial'
  | 'loading-list'
  | 'loading-details'
  | 'loaded'

export interface ListingState {
  listingStatus: ListingStatus
  searchTerm: string
  pokemons: ListedPokemon[]
  selectedPokemon: number
  details: Pokemon | undefined
}

export type ListingEventFetcAll = StoreEvent<'listing/fetchAll'>

export type ListingEventListLoaded =
  PayloadStoreEvent<'listing/listLoaded', ListedPokemon[]>

export type ListingEventSearch =
  PayloadStoreEvent<'listing/search', string>

export type ListingEventSelect =
  PayloadStoreEvent<'listing/select', number>

export type ListingEventDetailsLoaded =
  PayloadStoreEvent<'listing/detailsLoaded', Pokemon>

export type ListingEvent =
  | CoreEvent
  | ListingEventFetcAll
  | ListingEventListLoaded
  | ListingEventSearch
  | ListingEventSelect
  | ListingEventDetailsLoaded
  | NavigationEventAppNavigation

const fetchAll = (state: ListingState, event: ListingEventFetcAll): ListingState => ({
  ...state,
  listingStatus: 'loading-list' as const,
})

const listLoaded = (state: ListingState, event: ListingEventListLoaded): ListingState => ({
  ...state,
  listingStatus: 'loaded' as const,
  pokemons: event.payload,
})

const search = (state: ListingState, event: ListingEventSearch): ListingState => ({
  ...state,
  listingStatus: 'loading-list' as const,
  searchTerm: event.payload,
})

const select = (state: ListingState, event: ListingEventSelect): ListingState => ({
  ...state,
  listingStatus: 'loading-details' as const,
  selectedPokemon: event.payload,
})

const detailsLoaded = (state: ListingState, event: ListingEventDetailsLoaded): ListingState => ({
  ...state,
  listingStatus: 'loaded' as const,
  details: event.payload,
})

const reducers = {
  fetchAll,
  listLoaded,
  search,
  select,
  detailsLoaded,
}

const initialState: ListingState = {
  listingStatus: 'initial' as ListingStatus,
  searchTerm: '',
  pokemons: [],
  selectedPokemon: 0,
  details: undefined,
}

const listingSlice: CoreStoreSlice<ListingState, typeof reducers> =
  createCoreStoreSlice({
    name: 'listing',
    initialState,
    reducers,
  })

export const {
  eventCreators: {
    fetchAll: fetchAllCreator,
    listLoaded: listLoadedCreator,
    search: searchCreator,
    detailsLoaded: detailsLoadedCreator,
    select: selectCreator,
  },
  reducer: listingReducer,
} = listingSlice
