import { stringifyUrl } from '@core/url'
import type { UrlSearchConfig } from '@core/url'
import type { Observable } from 'rxjs'
import { defer } from 'rxjs'

export type RestClient<
  FETCHER extends Fetcher,
  API extends RestEndpoint<RestEndpointRequest, GetParsedType<FETCHER>>,
> = <REQUEST extends RestEndpointRequest>(request: REQUEST) =>
Observable<GetResponseType<API, REQUEST>>

export type RestEndpointRequest = {
  readonly method: RestMethod
  readonly pathname: string
  readonly search?: UrlSearchConfig
  readonly headers?: Record<string, string>
}

type RestMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH'

export type RestEndpoint<REQUEST extends RestEndpointRequest = any, RESPONSE = any> = {
  request: REQUEST
  response: RESPONSE
}

export type GetResponseType<API, REQUEST extends RestEndpointRequest> =
    API extends RestEndpoint<REQUEST, infer RESPONSE> ?
      RESPONSE :
      never

export type Fetcher<PARSED_TYPE = any> =
  (url: string, request: FetcherConfigArg) => Promise<PARSED_TYPE>

type GetParsedType<FETCHER extends Fetcher> = FETCHER extends Fetcher<infer PARSED_TYPE> ?
  PARSED_TYPE : never

export const createRestClientCreator =
  <FETCHER extends Fetcher> (fetcher: FETCHER) =>
    <API extends RestEndpoint<RestEndpointRequest, GetParsedType<FETCHER>>>
    (protocol: string, host: string) =>
      <REQUEST extends RestEndpointRequest> (request: REQUEST): Observable<GetResponseType<API, REQUEST>> =>
      // The value is unknown that comes from the fetcher, this is the boundary
      // where from the type is set. That is why the casting is necessary
        defer(async () => await fetcher(...getFetcherArg(protocol, host, request))) as
              Observable<GetResponseType<API, REQUEST>>

type FetcherConfigArg = {
  method: string
  headers?: Record<string, string>
}

const getFetcherArg = (
  protocol: string,
  hostname: string,
  { pathname, method, search, headers }: RestEndpointRequest,
): [string, FetcherConfigArg] => [
  stringifyUrl({
    protocol,
    hostname,
    pathname,
    search,
  }),
  {
    method,
    headers,
  },
]
