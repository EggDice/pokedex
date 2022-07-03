import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';
import { createListing } from './listing/listing-feature';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { appStore } from './app/app-store';
import type { PokemonService } from './pokemon/service';

test('renders the list of pokemons', () => {
  const store = appStore();
  const pokemonService = {
    getAllPokemon: () => mockObservableReturn([
      { name: 'bulbasaur', id: 1, image: 'source' }
    ]),
  } as unknown as PokemonService;
  const listing = createListing({ store, pokemonService });
  render(<App services={{ listing }} />);
  const loader = screen.queryAllByText('Loading...');
  expect(loader[0]).toBeInTheDocument();
});

const mockObservableReturn = (value: any) => of(value).pipe(delay(1));
