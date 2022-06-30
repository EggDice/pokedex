export const httpGet = <T> (url: string) => async (): Promise<T> => {
  const response = await fetch(url);
  return response.json();
};

export type HttpGet = typeof httpGet;
