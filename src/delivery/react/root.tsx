import React from 'react'
import { App } from '@/delivery/react/app'
import type { InternalServices } from '@/app'
import './root.css'

export interface ReactDelivery {
  Root: React.FC
}

export const getDelivery = (services: InternalServices): ReactDelivery => ({
  Root: () => (
    <React.StrictMode>
      <App services={ services } />
    </React.StrictMode>
  ),
})
