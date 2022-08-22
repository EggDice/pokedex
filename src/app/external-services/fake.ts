import { httpGetFake as httpGet } from '@/http/fake'
import { createMemoryHistory } from 'history'
import type { ExternalServices } from '@/app/type'

export const getExternalServicesFake = (): ExternalServices => {
  return {
    httpGet,
    history: createMemoryHistory(),
  }
}
