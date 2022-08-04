import React from 'react'
import './App.css'
import { ListingContext, Listing } from '@/listing'
import type { ListingFeature } from '@/listing'

interface AppProps {
  services: {
    listing: ListingFeature
  }
}

export const App: React.FC<AppProps> = ({ services: { listing } }: AppProps) => (
    <div className="App">
      <ListingContext.Provider value={listing}>
        <Listing />
      </ListingContext.Provider>
    </div>
)
