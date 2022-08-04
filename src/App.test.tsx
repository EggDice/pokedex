import { App } from './App'

import React from 'react'
import { render, screen } from '@testing-library/react'

import { createListing } from '@/listing'
import { appStore } from './app/app-store'
import { pokemonServiceFake as pokemonService } from '@/pokemon/fake'

test('starts to lead the pokemons', () => {
  const store = appStore()
  const listing = createListing({ store, pokemonService })
  render(<App services={{ listing }} />)
  const loader = screen.queryAllByText('Loading...')
  expect(loader[0]).toBeInTheDocument()
})
