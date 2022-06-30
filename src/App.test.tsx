import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';
import { createListingService } from './listing/service';
import { pokemonServiceFake } from './pokemon/fake';

test('renders the list of pokemons', () => {
  const listing = createListingService(pokemonServiceFake);
  render(<App services={{ listing }} />);
  const list = screen.getByTestId('pokemon-list');
  expect(list).toBeInTheDocument();
});
