import React from 'react';

type Image = {
  src: string,
  alt: string,
}

export const ImageGrid = ({images}: { images: Image[] }) => {
  return <ul data-testid="pokemon-list" className="listing-grid">
    {
      images.map(({src, alt}) => <img key={alt} alt={alt} src={src} className="pokemon-image"/>)
    }
  </ul>
}

