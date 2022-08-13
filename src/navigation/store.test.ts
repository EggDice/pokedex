import {
  navigationReducer,
  changeLocationCreator,
} from './store'

test('Default state is index', () => {
  const initialState = navigationReducer(undefined, { type: 'init' })
  expect(initialState).toEqual({
    pathname: '/',
    search: '',
    hash: '',
  })
})

test('Change location', () => {
  const initialState = {
    pathname: '/',
    search: '',
    hash: '',
  }
  const state = navigationReducer(initialState, changeLocationCreator({
    pathname: '/new-path',
    search: 'a=1&b=2',
    hash: 'new-hash',
  }))
  expect(state).toEqual({
    pathname: '/new-path',
    search: 'a=1&b=2',
    hash: 'new-hash',
  })
})
