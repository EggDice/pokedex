import { createRouter } from './router'

test('Route not found', () => {
  const router = createRouter([])
  const resolve = (): void => {
    router.resolve({
      pathname: '/',
      search: '',
      hash: '',
    })
  }
  expect(resolve).toThrow('Route not found: "/"')
})

test('Resolve route', () => {
  const router = createRouter([{
    path: '/',
    action: () => 'Main page',
    id: 'INDEX',
  }])
  const resolved = router.resolve({
    pathname: '/',
    search: '',
    hash: '',
  })
  expect(resolved).toBe('Main page')
})

test('Resolve route params', () => {
  const router = createRouter([{
    path: '/:id',
    action: (context, { id }) => `Main page ${id}`,
    id: 'INDEX',
  }])
  const resolved = router.resolve({
    pathname: '/1',
    search: '',
    hash: '',
  })
  expect(resolved).toBe('Main page 1')
})

test('Match route by id: match', () => {
  const router = createRouter([{
    path: '/:id',
    action: (context, { id }) => `Main page ${id as string}`,
    id: 'INDEX',
  }])
  const match = router.match({
    pathname: '/1',
    search: '',
    hash: '',
  }, 'INDEX')
  expect(match).toEqual({ id: '1' })
})

test('Match route by id: no match', () => {
  const router = createRouter([{
    path: '/path/:id',
    action: (context, { id }) => `Main page ${id as string}`,
    id: 'INDEX',
  }])
  const match = router.match({
    pathname: '/1',
    search: '',
    hash: '',
  }, 'INDEX')
  expect(match).toBe(undefined)
})
