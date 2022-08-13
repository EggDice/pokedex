import { createContext } from 'react'
import type { InternalServices } from '@/app'

export const InternalServicesContext = createContext<InternalServices | undefined>(undefined)
