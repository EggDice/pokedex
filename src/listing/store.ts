import { createCoreStoreSlice } from '@core/store'
import type {
  NamespacedStoreEvent,
  NamespacedState,
  StoreError,
} from '@core/store'
import type {
  Pokemon,
  ListedPokemon,
} from '@/pokemon'
import type {
  NavigationEventAppNavigation,
  NavigationEventPlatformNavigation,
} from '@/navigation'
import { LISTING_NAMESPACE } from './config'

export type ListingStatus =
  | 'initial'
  | 'loading-list'
  | 'loading-details'
  | 'loaded'
  | 'loading-error'

export interface ListingState {
  listingStatus: ListingStatus
  searchTerm: string
  pokemons: ListedPokemon[]
  selectedPokemon: number
  details: Pokemon | undefined
}

type ListingStoreEvent<
  SUB_TYPE extends string,
  PAYLOAD = undefined,
> = NamespacedStoreEvent<typeof LISTING_NAMESPACE, SUB_TYPE, PAYLOAD>

export type ListingEventFetcAll = ListingStoreEvent<'fetchAll'>

export type ListingEventListLoaded =
  ListingStoreEvent<'listLoaded', ListedPokemon[]>

export type ListingEventSearch =
  ListingStoreEvent<'search', string>

export type ListingEventSelect =
  ListingStoreEvent<'select', number>

export type ListingEventDetailsLoaded =
  ListingStoreEvent<'detailsLoaded', Pokemon>

export type ListingEventFetchError =
  ListingStoreEvent<'listError', StoreError>

export type ListingEvent =
  | ListingEventFetcAll
  | ListingEventListLoaded
  | ListingEventSearch
  | ListingEventSelect
  | ListingEventDetailsLoaded
  | ListingEventFetchError
  | NavigationEventAppNavigation
  | NavigationEventPlatformNavigation

const fetchAll = (state: ListingState, _: ListingEventFetcAll): ListingState => ({
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

const listError = (state: ListingState, _: ListingEventFetchError): ListingState => ({
  ...state,
  listingStatus: 'loading-error' as const,
})

const reducers = {
  fetchAll,
  listLoaded,
  search,
  select,
  detailsLoaded,
  listError,
}

const initialState: ListingState = {
  listingStatus: 'initial' as ListingStatus,
  searchTerm: '',
  pokemons: [],
  selectedPokemon: 0,
  details: undefined,
}

const listingSlice =
  createCoreStoreSlice({
    name: LISTING_NAMESPACE,
    initialState,
    reducers,
  })

export type AppStoreListingStateSlice = NamespacedState<typeof listingSlice>

export const {
  eventCreators: {
    createFetchAll,
    createListLoaded,
    createSearch,
    createDetailsLoaded,
    createSelect,
    createListError,
  },
  reducer: listingReducer,
  stateToListing,
} = listingSlice
