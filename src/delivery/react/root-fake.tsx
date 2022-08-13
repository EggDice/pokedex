import React from 'react'
import { Frame } from '@/delivery/react/app'
import type { InternalServices } from '@/app'
import './root.css'

export interface ReactDelivery {
  Root: React.FC<{ children: JSX.Element }>
}

export const getDelivery = (services: InternalServices): ReactDelivery => ({
  Root: ({ children }) => (
    <React.StrictMode>
      <Frame services={ services }>
        { children }
      </Frame>
    </React.StrictMode>
  ),
})
