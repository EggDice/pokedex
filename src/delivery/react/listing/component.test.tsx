import React from 'react'
import { render as tlRender, act, screen, fireEvent } from '@testing-library/react'
import { Listing } from './component'
import { createListing } from '@/listing'
import { pokemonServiceFake as pokemonService } from '@/pokemon/fake'
import { appStore } from '@/app/app-store'
import { InternalServicesContext } from '@/delivery/react/app'
import type { InternalServices } from '@/app'

test('renders the list of pokemons', async () => {
  const { listing } = render(<Listing />)
  act(() => {
    listing.loadPokemonList()
  })
  const loader = screen.queryAllByText('Loading...')
  expect(loader[0]).toBeInTheDocument()
  const listedPokemon = await screen.findByAltText('bulbasaur')
  expect(listedPokemon).toBeInTheDocument()
})

test('selects a pokemon', async () => {
  const { listing } = render(<Listing />)
  act(() => {
    listing.loadPokemonList()
  })
  const dialog = screen.getByRole('dialog', { hidden: true })
  expect(dialog).not.toBeVisible()
  const listedPokemon = await screen.findByAltText('bulbasaur')
  fireEvent.click(listedPokemon)
  const selectedPokemon = await screen.findByText('bulbasaur')
  expect(selectedPokemon).toBeInTheDocument()
})

test('close modal', async () => {
  const { listing } = render(<Listing />)
  act(() => {
    listing.loadPokemonList()
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
  render(<Listing />)
  const textBox = screen.getByLabelText('search')
  fireEvent.change(textBox, { target: { value: 'bulbasaur' } })
  const submit = screen.getByText('Search')
  fireEvent.click(submit)
  const loader = screen.queryAllByText('Loading...')
  expect(loader[0]).toBeInTheDocument()
  const listedPokemon = await screen.findByAltText('bulbasaur')
  expect(listedPokemon).toBeInTheDocument()
})

const render = (ui: JSX.Element, options?: any): InternalServices => {
  const store = appStore()
  const listing = createListing({ store, pokemonService })
  const internalServices = { listing }
  const Provider: React.FC<{ children: JSX.Element }> = ({ children }) => (
    <InternalServicesContext.Provider value={internalServices}>
      { children }
    </InternalServicesContext.Provider>
  )
  tlRender(ui, { wrapper: Provider, ...options })
  return internalServices
}
