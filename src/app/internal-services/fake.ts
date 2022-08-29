import { getInternalServices } from '.'
import { getExternalServicesFake as getExternalServices } from '@/app/external-services/fake'
import { createRouter } from '@/navigation'

export const internalServicesFake = getInternalServices({
  ...getExternalServices(),
  router: createRouter([]),
})
