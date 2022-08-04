import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { SearchBox } from './search-box'

test('calls search callback on click', () => {
  let term
  render(<SearchBox onSearch={(t: string) => { term = t }} />)
  const textBox = screen.getByLabelText('search')
  fireEvent.change(textBox, { target: { value: 'something' } })
  const submit = screen.getByText('Search')
  fireEvent.click(submit)
  expect(term).toBe('something')
})
