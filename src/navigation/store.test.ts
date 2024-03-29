import { STORE_INIT } from '@core/fake'
import {
  navigationReducer,
  createChangeLocation,
} from './store'

test('Default state is index', () => {
  const initialState = navigationReducer(undefined, STORE_INIT)
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
  const state = navigationReducer(initialState, createChangeLocation({
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
