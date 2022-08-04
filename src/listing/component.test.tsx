import React from 'react'
import { render, act, screen, fireEvent } from '@testing-library/react'
import { Listing } from './component'
import { createListing } from './feature'
import { pokemonServiceFake as pokemonService } from '@/pokemon/fake'
import { appStore } from '@/app/app-store'
import { ListingContext } from './context'

test('renders the list of pokemons', async () => {
  const store = appStore()
  const listingFeature = createListing({ store, pokemonService })
  render(
    <ListingContext.Provider value={listingFeature}>
      <Listing />
    </ListingContext.Provider>,
  )
  act(() => {
    listingFeature.loadPokemonList()
  })
  const loader = screen.queryAllByText('Loading...')
  expect(loader[0]).toBeInTheDocument()
  const listedPokemon = await screen.findByAltText('bulbasaur')
  expect(listedPokemon).toBeInTheDocument()
})

test('selects a pokemon', async () => {
  const store = appStore()
  const listingFeature = createListing({ store, pokemonService })
  render(
    <ListingContext.Provider value={listingFeature}>
      <Listing />
    </ListingContext.Provider>,
  )
  act(() => {
    listingFeature.loadPokemonList()
  })
  const dialog = screen.getByRole('dialog', { hidden: true })
  expect(dialog).not.toBeVisible()
  const listedPokemon = await screen.findByAltText('bulbasaur')
  fireEvent.click(listedPokemon)
  const selectedPokemon = await screen.findByText('bulbasaur')
  expect(selectedPokemon).toBeInTheDocument()
})

test('close modal', async () => {
  const store = appStore()
  const listingFeature = createListing({ store, pokemonService })
  render(
    <ListingContext.Provider value={listingFeature}>
      <Listing />
    </ListingContext.Provider>,
  )
  act(() => {
    listingFeature.loadPokemonList()
  })
  const dialog = screen.getByRole('dialog', { hidden: true })
  expect(dialog).not.toBeVisible()
  const listedPokemon = await screen.findByAltText('bulbasaur')
  fireEvent.click(listedPokemon)
  const selectedPokemon = await screen.findByText('bulbasaur')
  const close = screen.getByText('close')
  fireEvent.click(close)
  expect(selectedPokemon).not.toBeInTheDocument()
})

test('searches for pokemons', async () => {
  const store = appStore()
  const listingFeature = createListing({ store, pokemonService })
  render(
    <ListingContext.Provider value={listingFeature}>
      <Listing />
    </ListingContext.Provider>,
  )
  const textBox = screen.getByLabelText('search')
  fireEvent.change(textBox, { target: { value: 'bulbasaur' } })
  const submit = screen.getByText('Search')
  fireEvent.click(submit)
  const loader = screen.queryAllByText('Loading...')
  expect(loader[0]).toBeInTheDocument()
  const listedPokemon = await screen.findByAltText('bulbasaur')
  expect(listedPokemon).toBeInTheDocument()
})
