import type { HttpGet } from '@/http'
import type { ListingFeature } from '@/listing'

export interface ExternalServices {
  httpGet: HttpGet
}

export interface InternalServices {
  listing: ListingFeature
}
