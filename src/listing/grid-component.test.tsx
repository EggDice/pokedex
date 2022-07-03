import React from 'react';
import { render, screen } from '@testing-library/react';
import { ImageGrid } from './grid-component';

test('renders the list of pokemons', () => {
  const images = [
    {
      image: 'source-1',
      name: 'pokemon image 1',
      id: 1,
    },
    {
      image: 'source-2',
      name: 'pokemon image 2',
      id: 2,
    },
  ]
  render(<ImageGrid images={images} onSelect={() => {}} isListLoaded={true} />);
  const image1 = screen.getByAltText('pokemon image 1');
  expect(image1).toHaveAttribute('src', 'source-1');
});
