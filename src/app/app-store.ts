import { createCoreStore } from '../core/store';
import { listingSlice } from '../listing/listing-store';

import type { CoreStore } from '../core/store'
import type { ListingState, ListingEvent } from '../listing/listing-store';

export type AppStoreState = {
  listing: ListingState,
};

export type AppStoreEvent =
  | ListingEvent;

export type AppStore = CoreStore<AppStoreState, AppStoreEvent>

export const appStore = (): AppStore => createCoreStore<AppStoreState, AppStoreEvent>({
  listing: listingSlice.reducer,
})

