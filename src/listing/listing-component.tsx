import React, { useContext, useEffect, useState } from 'react';
import { ListingContext } from './listing-context';
import { ImageGrid } from './grid-component';
import { SearchBox } from './search-box';
import { useObservableState } from 'observable-hooks'
import type { ListingFeature } from './listing-feature';
import './listing-component.css';

export const Listing = () => {
  const {
    pokemons$,
    details$,
    isListLoaded$,
    isDetailsLoaded$,
    isModalOpen$,
    search,
    select
  } = useContext(ListingContext) as ListingFeature;
  const pokemons = useObservableState(pokemons$, []);
  const details = useObservableState(details$, undefined);
  const isListLoaded = useObservableState(isListLoaded$, false)
  const isDetailsLoaded = useObservableState(isDetailsLoaded$, false)
  const isModalOpen = useObservableState(isModalOpen$, false)

  return <>
    <dialog className="modal" open={isModalOpen}>
      {
        isDetailsLoaded ?
          <>
            <h2>{ details?.name }</h2>
            <dl>
              <dt>Types</dt>
              <dd>{ details?.types.join(' ') }</dd>
              {
                details?.stats.map(({ name, value }) => (
                  <React.Fragment key={name}>
                    <dt>{name}</dt>
                    <dd>{value}</dd>
                  </React.Fragment>
                ))
              }
            </dl>
            <footer>
              <button onClick={() => select(0)}>Close</button>
            </footer>
          </>
          :
          <p>Loading...</p>
      }
    </dialog>
    <section className="listing">
      <SearchBox onSearch={(term) => { search(term); }} />
      { isListLoaded ? <ImageGrid onSelect={select} images={pokemons} /> : <p className="loader">Loading...</p> }
    </section>;
  </>
};
