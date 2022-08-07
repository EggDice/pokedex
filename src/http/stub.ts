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
    <T> (urlRequested: string) =>
      () => {
        const response = stubbedEndpoints
          .find(({ url }) => url === urlRequested)
          ?.response as T
        return getFakeValue(response)
      }
/* eslint-disable @typescript-eslint/promise-function-async */

const getFakeValue = <T>(value: T): Promise<T> | Promise<never> =>
  value instanceof Error
    ? timer(1).pipe(
      mergeMap(() => throwError(value)),
    ) as unknown as Promise<never>
    : of(value).pipe(delay(1)) as unknown as Promise<T>
