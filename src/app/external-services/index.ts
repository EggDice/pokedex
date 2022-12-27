import { ExternalServices } from '@/app/type'
import { createBrowserHistory } from 'history'
import { pokemonApiClient } from '@/pokemon/api'

export const getExternalServices = (): ExternalServices => {
  return {
    pokemonApiClient,
    history: createBrowserHistory(),
  }
}
