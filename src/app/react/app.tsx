import React from 'react'
import ReactDOM from 'react-dom/client'
import { createApplication } from '@core/application'
import { getExternalServices } from '@/app/external-services'
import { getInternalServices } from '@/app/internal-services'
import { preRender } from '@/app/pre-render'
import { getDelivery } from '@/delivery/react/root'
import { router } from '@/delivery/react/app/router'
import type { ReactDelivery } from '@/delivery/react/root'
import type { ExternalServices, InternalServices } from '@/app/type'

export const application =
  createApplication<ExternalServices, InternalServices, ReactDelivery, undefined>({
    getExternalServices: () => ({ ...getExternalServices(), router }),
    getInternalServices,
    preRender,
    getDelivery,
    render: ({ delivery: { Root } }) => {
      const root = ReactDOM.createRoot(
        document.getElementById('root') as HTMLElement,
      )
      root.render(<Root/>)
    },
  })
