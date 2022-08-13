import React from 'react'
import './frame.css'
import { InternalServicesContext } from './context'
import type { InternalServices } from '@/app'

interface AppProps {
  services: InternalServices
  children: JSX.Element
}

export const Frame: React.FC<AppProps> = ({ services, children }) => (
  <div className="App">
    <InternalServicesContext.Provider value={services}>
      { children }
    </InternalServicesContext.Provider>
  </div>
)
