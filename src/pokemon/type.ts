export interface Pokemon {
  id: number
  name: string
  image: string
  types: string[]
  stats: PokemonStat[]
}

export interface ListedPokemon {
  id: number
  name: string
  image: string
}

interface PokemonStat {
  name: string
  value: number
}
