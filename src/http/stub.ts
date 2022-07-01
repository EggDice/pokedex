type StubbedEndpoint<T = any> = {
  url: string,
  response: T,
};

export const httpGetStub =
  (stubbedEndpoints: StubbedEndpoint[]) =>
    <T> (url: string) =>
      async () => {
        const response = stubbedEndpoints
          .find((endpoint) => endpoint.url === url)?.response as T;
        if (response instanceof Error) {
          throw response;
        }
        return response;
      }
