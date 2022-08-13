import React from 'react'
import './grid.css'

interface Image {
  image: string
  name: string
  id: number
}

interface Props {
  images: Image[]
  onSelect: (id: number) => void
  isListLoaded: boolean
}

export const ImageGrid: React.FC<Props> = ({ images, onSelect, isListLoaded }) => {
  return isListLoaded
    ? <ul data-testid="pokemon-list" className="listing-grid">
      {
        images.map(
          ({ image, name, id }) =>
            <li key={id} onClick={() => { onSelect(id) }} className="listing-pokemon">
              <img alt={name} src={image} className="pokemon-image"/>
            </li>)
      }
    </ul>
    : <p className="loader" aria-busy="true">Loading...</p>
}
