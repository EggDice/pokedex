import { of, throwError, timer } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

type StubbedEndpoint<T = any> = {
  url: string,
  response: T,
};

export const httpGetStub =
  (stubbedEndpoints: StubbedEndpoint[]) =>
    <T> (url: string) =>
      () => {
        const response = stubbedEndpoints
          .find((endpoint) => endpoint.url === url)?.response as T;
        if (response instanceof Error) {
          return timer(1).pipe(
            mergeMap(() => throwError(response))
          ) as unknown as Promise<never>;
        }
        return of(response).pipe(delay(1)) as unknown as Promise<T>;
      }
