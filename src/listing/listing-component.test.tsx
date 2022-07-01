import React from 'react';
import { render, screen } from '@testing-library/react';
import { Listing } from './listing-component';
//import { createListingService } from './service';
import { pokemonServiceFake } from '../pokemon/fake';
import { ListingContext } from './listing-context';

test('renders the list of pokemons', () => {
//  const listingService = createListingService(pokemonServiceFake);
//  render(
//    <ListingContext.Provider value={listingService}>
//      <Listing />
//    </ListingContext.Provider>
//  );
//  const list = screen.getByTestId('pokemon-list');
//  expect(list).toBeInTheDocument();
});
