import { App } from './component'

import React from 'react'
import { render, screen } from '@testing-library/react'

import { internalServicesFake as internalServices } from '@/app/internal-services/fake'

test('starts to lead the pokemons', () => {
  render(<App services={internalServices} />)
  const [loader] = screen.queryAllByText('Loading...')
  expect(loader).toBeInTheDocument()
})
