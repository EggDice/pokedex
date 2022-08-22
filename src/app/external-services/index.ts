import { httpGet } from '@/http'
import { ExternalServices } from '@/app/type'
import { createBrowserHistory } from 'history'

export const getExternalServices = (): ExternalServices => {
  return {
    httpGet,
    history: createBrowserHistory(),
  }
}
