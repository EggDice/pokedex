import React from 'react';
import './grid-component.css';

type Image = {
  src: string,
  alt: string,
}

export const ImageGrid = ({images}: { images: Image[] }) => {
  return <ul data-testid="pokemon-list" className="listing-grid">
    {
      images.map(
        ({src, alt}) =>
          <li key={alt} className="listing-pokemon">
            <img alt={alt} src={src} className="pokemon-image"/>
          </li>)
    }
  </ul>
}

