import { Frame } from './frame'

import React, { useContext } from 'react'
import { render } from '@testing-library/react'
import { internalServicesFake as internalServices } from '@/app/internal-services/fake'
import { InternalServicesContext } from './context'

test('Provides the services', () => {
  let services

  const TestConsumer: React.FC = () => {
    services = useContext(InternalServicesContext)
    return <></>
  }
  render(
    <Frame services={internalServices}>
      <TestConsumer />
    </Frame>,
  )
  expect(Object.keys(services ?? {}).length > 0).toBe(true)
})
