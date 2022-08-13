import { createCoreStoreSlice } from '@core/store'
import type {
  PayloadStoreEvent,
} from '@core/store'
import type { Location } from './type'

export type NavigationState = Location

export type NavigationEventChangeLocation =
  PayloadStoreEvent<'navigation/changeLocation', Location>

export type NavigationEvent =
  | NavigationEventChangeLocation

const changeLocation =
  (state: NavigationState, event: NavigationEventChangeLocation): NavigationState => ({
    ...event.payload,
  })

const reducers = {
  changeLocation,
}

const initialState = {
  pathname: '/',
  search: '',
  hash: '',
}

const navigationSlice = createCoreStoreSlice<NavigationState, typeof reducers>({
  name: 'navigation',
  initialState,
  reducers,
})

export const {
  eventCreators: {
    changeLocation: changeLocationCreator,
  },
  reducer: navigationReducer,
} = navigationSlice
