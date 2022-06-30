import { createListingService } from './service';
import { pokemonServiceFake } from '../pokemon/fake';

test('pokemon list', async () => {
  const listing = createListingService(pokemonServiceFake);
  const images = await listing.listImagesAndAlts();
  expect(images.length).toBe(151);
  expect(images[0]).toEqual({
    alt: 'bulbasaur',
    src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  });
});
