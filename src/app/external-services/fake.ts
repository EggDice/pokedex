import { createMemoryHistory } from 'history'
import type { ExternalServices } from '@/app/type'
import { pokemonApiClient } from '@/pokemon/stub'

export const getExternalServicesFake = (): ExternalServices => {
  return {
    pokemonApiClient,
    history: createMemoryHistory(),
  }
}
