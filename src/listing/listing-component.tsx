import React, { useContext } from 'react';
import { ListingContext } from './listing-context';
import { ImageGrid } from './grid-component';
import { SearchBox } from './search-box';
import { DetailsDialog } from './details-modal';
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
    <DetailsDialog
      isDetailsLoaded={isDetailsLoaded}
      isModalOpen={isModalOpen}
      details={details}
      onClose={() => select(0)}
    />
    <section className="listing">
      <SearchBox onSearch={(term) => { search(term); }} />
      <ImageGrid onSelect={select} images={pokemons} isListLoaded={isListLoaded}/>
    </section>;
  </>
};
