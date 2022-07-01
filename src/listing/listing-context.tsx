import { createContext } from 'react';
import type { ListingFeature } from './listing-feature';

export const ListingContext = createContext<ListingFeature | undefined>(undefined);
