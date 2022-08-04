import React from 'react'
import { render, screen } from '@testing-library/react'
import { Listing } from './component'
import { createListing } from './feature'
import { pokemonServiceFake as pokemonService } from '@/pokemon/fake'
import { appStore } from '@/app/app-store'
import { ListingContext } from './context'

test('renders the list of pokemons', () => {
  const store = appStore()
  const listingFeature = createListing({ store, pokemonService })
  render(
    <ListingContext.Provider value={listingFeature}>
      <Listing />
    </ListingContext.Provider>,
  )
  const loader = screen.queryAllByText('Loading...')
  expect(loader[0]).toBeInTheDocument()
})
