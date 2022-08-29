import React from 'react'
import { render as testingLibraryRender } from '@testing-library/react'
import { createApplication } from '@core/application'
import type { AppArgs } from '@core/application'
import { getExternalServicesFake as getExternalServices } from '@/app/external-services/fake'
import { getInternalServices } from '@/app/internal-services'
import { preRender } from '@/app/pre-render'
import { getDelivery } from '@/delivery/react/root-fake'
import { router } from '@/delivery/react/app/router'
import type { ReactDelivery } from '@/delivery/react/root-fake'
import type { ExternalServices, InternalServices } from '@/app/type'

type RenderOptions = Omit<AppArgs<ExternalServices, InternalServices, ReactDelivery>, 'render'>

export const render = (ui: JSX.Element, options?: RenderOptions): InternalServices =>
  // It would be only undefined if there is an error, the type check would not have any upside in
  // the test so casting to avoid null checking in tests
  createApplication<ExternalServices, InternalServices, ReactDelivery, undefined>({
    getExternalServices: () => ({ ...getExternalServices(), router }),
    getInternalServices,
    preRender,
    getDelivery,
    render: ({ delivery: { Root } }) => {
      testingLibraryRender(<Root>{ui}</Root>)
    },
  }).run(options)?.services as InternalServices
