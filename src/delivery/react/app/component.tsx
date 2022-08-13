import React from 'react'
import { Listing } from '@/delivery/react/listing'
import { Frame } from './frame'
import type { InternalServices } from '@/app'

interface AppProps {
  services: InternalServices
}

export const App: React.FC<AppProps> = ({ services }: AppProps) => (
  <Frame services={services}>
    <Listing />
  </Frame>
)
