import React, { useContext, useEffect, useState } from 'react';
import { ListingContext } from './listing-context';
import { ImageGrid } from './grid-component';

export const Listing = () => {
  const [ images, setImages ] = useState<{src: string, alt: string}[]>([]);
  const listingService = useContext(ListingContext);

  // Not optimal it should use fetch then render
  useEffect(() => {
    listingService?.listImagesAndAlts().then((imgs) => {
      setImages(imgs);
    })
  });


  return <ImageGrid images={images} />
};
