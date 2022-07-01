import React from 'react';
import './grid-component.css';

type Image = {
  image: string,
  name: string,
  id: number,
}

export const ImageGrid = ({images}: { images: Image[] }) => {
  return <ul data-testid="pokemon-list" className="listing-grid">
    {
      images.map(
        ({image, name, id}) =>
          <li key={id} className="listing-pokemon">
            <img alt={name} src={image} className="pokemon-image"/>
          </li>)
    }
  </ul>
}

