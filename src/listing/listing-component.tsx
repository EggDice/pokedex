import React, { useContext, useEffect, useState } from 'react';
import { ListingContext } from './listing-context';
import { ImageGrid } from './grid-component';
import { useObservableState } from 'observable-hooks'
import type { ListingFeature } from './listing-feature';

export const Listing = () => {
  const { pokemons$, isListLoaded$ } = useContext(ListingContext) as ListingFeature;
  const pokemons = useObservableState(pokemons$, []);
  const isListLoaded = useObservableState(isListLoaded$, false)

  return isListLoaded ? <ImageGrid images={pokemons} /> : <p>Loading...</p>
};
