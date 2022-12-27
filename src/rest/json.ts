import { JsonType } from '@core/type'
import { createRestClientCreator } from './service'
import type { Fetcher, RestEndpoint, RestEndpointRequest, RestClient } from './service'

export const jsonFetcher: Fetcher<JsonType | Error> = async (url, request) =>
  await (await fetch(url, request)).json()

export const createJsonRestClient = createRestClientCreator(jsonFetcher)

export type JsonRestClient<API extends RestEndpoint<RestEndpointRequest, JsonType | Error>> =
  RestClient<Fetcher<JsonType | Error>, API>
