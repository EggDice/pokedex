import { stringifyUrl, parseUrl } from './url'

test('stringify full url', () => {
  expect(stringifyUrl({
    protocol: 'https',
    hostname: 'localhost',
    pathname: '/path',
    port: 8080,
    search: {
      a: '1',
      b: '2',
    },
    hash: 'hash',
  })).toBe('https://localhost:8080/path?a=1&b=2#hash')
})

test('stringify partial url', () => {
  expect(stringifyUrl({
    protocol: 'https',
    hostname: 'localhost',
  })).toBe('https://localhost/')
})

test('parse full url', () => {
  expect(parseUrl('https://localhost:8080/path?a=1&b=2#hash')).toEqual({
    protocol: 'https',
    hostname: 'localhost',
    pathname: '/path',
    port: 8080,
    search: {
      a: '1',
      b: '2',
    },
    hash: 'hash',
  })
})

test('parse full url', () => {
  expect(parseUrl('https://localhost/')).toEqual({
    protocol: 'https',
    hostname: 'localhost',
    pathname: '/',
    port: 80,
    search: {},
    hash: '',
  })
})
