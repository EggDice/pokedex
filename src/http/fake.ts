import { httpGetStub } from './stub'
import { pokemonApi } from '@/pokemon/stub'

export const httpGetFake = httpGetStub(pokemonApi)
