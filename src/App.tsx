import React from 'react';
import './App.css';
import { ListingContext } from './listing/listing-context';
import { Listing } from './listing/listing-component';
import type { ListingFeature } from './listing/listing-feature';

type AppProps = {
  services: {
    listing: ListingFeature,
  },
};

export const App = ({ services: { listing } }: AppProps) => (
    <div className="App">
      <ListingContext.Provider value={listing}>
        <Listing />
      </ListingContext.Provider>
    </div>
  );
