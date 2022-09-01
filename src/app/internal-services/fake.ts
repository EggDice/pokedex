import { getInternalServices } from '.'
import { getExternalServicesFake as getExternalServices } from '@/app/external-services/fake'

export const internalServicesFake = getInternalServices(getExternalServices())
