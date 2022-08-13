import React from 'react'
import { act, screen, fireEvent } from '@testing-library/react'
import { render } from '@/app/react/test-render'
import { Listing } from './component'

test('renders the list of pokemons', async () => {
  const { listing } = render(<Listing />)
  act(() => {
    listing.loadPokemonList()
  })
  const [loader] = screen.queryAllByText('Loading...')
  expect(loader).toBeInTheDocument()
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
  const [loader] = screen.queryAllByText('Loading...')
  expect(loader).toBeInTheDocument()
  const listedPokemon = await screen.findByAltText('bulbasaur')
  expect(listedPokemon).toBeInTheDocument()
})
