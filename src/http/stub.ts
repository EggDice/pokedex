import { of, throwError, timer } from 'rxjs'
import { delay, mergeMap } from 'rxjs/operators'

interface StubbedEndpoint<T = any> {
  url: string
  response: T
}

/* eslint-disable @typescript-eslint/promise-function-async */
// This function has to return an observable to make sure marble works because marble cannot handle
// real promises because it cannot fake the time of real async.
export const httpGetStub =
  (stubbedEndpoints: StubbedEndpoint[]) =>
    <T> (url: string) =>
      () => {
        const response = stubbedEndpoints
          .find((endpoint) => endpoint.url === url)?.response as T
        if (response instanceof Error) {
          return timer(1).pipe(
            mergeMap(() => throwError(response)),
          ) as unknown as Promise<never>
        }
        return of(response).pipe(delay(1)) as unknown as Promise<T>
      }
/* eslint-disable @typescript-eslint/promise-function-async */
