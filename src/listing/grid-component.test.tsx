import React from 'react';
import { render, screen } from '@testing-library/react';
import { ImageGrid } from './grid-component';

test('renders the list of pokemons', () => {
  const images = [
    {
      src: 'source 1',
      alt: 'pokemon image 1',
    },
    {
      src: 'source 2',
      alt: 'pokemon image 2',
    },
  ]
  render(<ImageGrid images={images} />);
  const image1 = screen.getByAltText('pokemon image 1');
  expect(image1).toHaveAttribute('src', 'source 1');
});
