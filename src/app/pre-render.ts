import type { InternalServices } from './type'

export const preRender = ({ listing }: InternalServices): void => {
  listing.loadPokemonList()
}
