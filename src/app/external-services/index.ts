import { httpGet } from '@/http'
import { ExternalServices } from '@/app/type'

export const getExternalServices = (): ExternalServices => {
  return {
    httpGet,
  }
}
