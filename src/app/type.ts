import type { HttpGet } from '@/http'
import type { ListingFeature } from '@/listing'
import type { NavigationFeature, Router } from '@/navigation'
import type { History } from 'history'

export interface ExternalServices {
  httpGet: HttpGet
  history: History
  router: Router<string>
}

export interface InternalServices {
  listing: ListingFeature
  navigation: NavigationFeature<string>
}
