import React from 'react'
import { render as testingLibraryRender } from '@testing-library/react'
import { createApplication } from '@core/application'
import type { AppArgs } from '@core/application'
import { getExternalServicesFake as getExternalServices } from '@/app/external-services/fake'
import { getInternalServices } from '@/app/internal-services'
import { preRender } from '@/app/pre-render'
import { getDelivery } from '@/delivery/react/root-fake'
import type { ReactDelivery } from '@/delivery/react/root-fake'
import type { ExternalServices, InternalServices } from '@/app/type'

type RenderOptions = Omit<AppArgs<ExternalServices, InternalServices, ReactDelivery>, 'render'>

export const render = (ui: JSX.Element, options?: RenderOptions): InternalServices =>
  createApplication<ExternalServices, InternalServices, ReactDelivery, undefined>({
    getExternalServices,
    getInternalServices,
    preRender,
    getDelivery,
    render: ({ delivery: { Root } }) => {
      testingLibraryRender(<Root>{ui}</Root>)
    },
  }).run(options).services
