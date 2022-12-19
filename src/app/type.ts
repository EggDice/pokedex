import type { HttpGet } from '@/http'
import type { ListingFeature } from '@/listing'
import { LISTING_NAMESPACE } from '@/listing/config'
import type { NavigationFeature } from '@/navigation'
import { NAVIGATION_NAMESPACE } from '@/navigation/config'
import type { History } from 'history'

export interface ExternalServices {
  httpGet: HttpGet
  history: History
}

export interface InternalServices {
  [LISTING_NAMESPACE]: ListingFeature
  [NAVIGATION_NAMESPACE]: NavigationFeature
}
