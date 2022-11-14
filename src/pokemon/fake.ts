import { createPokemonService } from './service'
import { httpGetFake as httpGet } from '@/http/fake'
import { addErrorMethodsToFake } from '@core/fake'

export const createPokemonServiceFake = addErrorMethodsToFake(() => createPokemonService(httpGet))

export const BULBASAUR = {
  id: 1,
  name: 'bulbasaur',
  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  types: ['grass', 'poison'],
  stats: [
    { name: 'hp', value: 45 },
    { name: 'attack', value: 49 },
    { name: 'defense', value: 49 },
    { name: 'special-attack', value: 65 },
    { name: 'special-defense', value: 65 },
    { name: 'speed', value: 45 },
  ],
}

export const BULBASAUR_LISTED = {
  id: 1,
  name: 'bulbasaur',
  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
}
