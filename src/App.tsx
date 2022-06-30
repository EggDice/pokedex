import React from 'react';
import './App.css';
import { ListingContext } from './listing/listing-context';
import { Listing } from './listing/listing-component';
import type { ListingService } from './listing/service';

type AppProps = {
  services: {
    listing: ListingService,
  },
};

export const App = ({ services: { listing } }: AppProps) => (
    <div className="App">
      <ListingContext.Provider value={listing}>
        <Listing />
      </ListingContext.Provider>
    </div>
  );
