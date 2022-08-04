import { createContext } from 'react'
import type { ListingFeature } from './feature'

export const ListingContext = createContext<ListingFeature | undefined>(undefined)
