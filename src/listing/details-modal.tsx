import React, { Fragment } from 'react';
import type { PokemonDetails } from './listing-store';

type Props = {
  isModalOpen: boolean,
  isDetailsLoaded: boolean,
  details: PokemonDetails | undefined,
  onClose: () => void,
};

export const DetailsDialog = ({ isModalOpen, isDetailsLoaded, details, onClose }: Props) => {
  return <dialog className="modal" open={isModalOpen}>
    {
      isDetailsLoaded ?
        <>
          <h2>{ details?.name }</h2>
          <dl>
            <dt>Types</dt>
            <dd>{ details?.types.join(' ') }</dd>
            {
              details?.stats.map(({ name, value }) => (
                <Fragment key={name}>
                  <dt>{name}</dt>
                  <dd>{value}</dd>
                </Fragment>
              ))
            }
          </dl>
        </> :
        <p aria-busy="true">Loading</p>
    }
    <footer>
      <button onClick={onClose}>close</button>
    </footer>
  </dialog>
};
