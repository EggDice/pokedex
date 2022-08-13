import { httpGetFake as httpGet } from '@/http/fake'
import { ExternalServices } from '@/app/type'

export const getExternalServicesFake = (): ExternalServices => {
  return {
    httpGet,
  }
}