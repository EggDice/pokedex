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
  // console.log(services)
  expect(Object.keys(services as unknown as Object).length > 0).toBe(true)
})
