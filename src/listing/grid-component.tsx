import React from 'react';
import './grid-component.css';

type Image = {
  image: string,
  name: string,
  id: number,
};

type Props = {
  images: Image[],
  onSelect: (id: number) => void,
};

export const ImageGrid = ({images, onSelect}: Props) => {
  return <ul data-testid="pokemon-list" className="listing-grid">
    {
      images.map(
        ({image, name, id}) =>
          <li key={id} onClick={() => {onSelect(id)}} className="listing-pokemon">
            <img alt={name} src={image} className="pokemon-image"/>
          </li>)
    }
  </ul>
}

