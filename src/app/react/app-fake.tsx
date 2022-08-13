import React from 'react'
import ReactDOM from 'react-dom/client'
import { createApplication } from '@core/application'
import type { Application } from '@core/application'
import { getExternalServicesFake as getExternalServices } from '@/app/external-services/fake'
import { getInternalServices } from '@/app/internal-services'
import { preRender } from '@/app/pre-render'
import { getDelivery } from '@/delivery/react/root-fake'
import type { ReactDelivery } from '@/delivery/react/root-fake'
import type { ExternalServices, InternalServices } from '@/app/type'

export const createFakeApp = (ui: JSX.Element): FakeApp =>
  createApplication<ExternalServices, InternalServices, ReactDelivery, undefined>({
    getExternalServices,
    getInternalServices,
    preRender,
    getDelivery,
    render: ({ delivery: { Root } }) => {
      const root = ReactDOM.createRoot(
        document.getElementById('root') as HTMLElement,
      )
      root.render(<Root>{ui}</Root>)
    },
  })

type FakeApp = Application<ExternalServices, InternalServices, ReactDelivery, undefined>
