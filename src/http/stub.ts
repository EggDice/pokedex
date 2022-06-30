type StubbedEndpoint<T = any> = {
  url: string,
  response: T,
};

export const httpGetStub =
  (stubbedEndpoints: StubbedEndpoint[]) =>
    <T> (url: string) =>
      async () =>
        stubbedEndpoints
          .find((endpoint) => endpoint.url === url)?.response as T;
