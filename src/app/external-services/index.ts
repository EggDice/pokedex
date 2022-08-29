import { httpGet } from '@/http'
import { ExternalServices } from '@/app/type'
import { createBrowserHistory } from 'history'

export const getExternalServices = (): Omit<ExternalServices, 'router'> => {
  return {
    httpGet,
    history: createBrowserHistory(),
  }
}
