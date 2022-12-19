import { createChangeLocation } from './store'
import type { NavigationEvent } from './store'
import type { EventReceiver } from '@core/store'
import type { Location } from './type'

export interface NavigationCommand {
  appNavigation: (location: Location) => void
}

export const navigationCommand = <APP_STORE_EVENT extends NavigationEvent>
  (appStore: EventReceiver<APP_STORE_EVENT | NavigationEvent>): NavigationCommand => ({
    appNavigation: (location: Location) => {
      appStore.send(createChangeLocation(location))
    },
  })
