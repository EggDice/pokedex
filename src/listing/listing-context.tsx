import { createContext } from 'react';
import type { ListingService } from './service';

export const ListingContext = createContext<ListingService | undefined>(undefined);
