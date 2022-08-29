import UniversalRouterSync from 'universal-router/sync'
import type { Location } from './type'

interface Route<T> {
  path: string
  action: (context: RouteContext, params: PathParams) => T
  id: string
}

export interface Router<T> {
  resolve: (location: Location) => T
  match: (location: Location, id: string) => PathParams | undefined
}

interface PathParams {
  [pathVariable: string]: string | string[]
}

interface RouteContext {
  path: string
}

export const createRouter = <T> (routes: Array<Route<T>>): Router<T> => {
  const universalRouter = new UniversalRouterSync(routes)
  const matchRoutes = routes.map((route) => ({
    ...route,
    action: (_: RouteContext, params: PathParams) => params,
  }))
  return {
    resolve: (location) => {
      try {
        return universalRouter.resolve(location) as T
      } catch (err) {
        throw new Error(`Route not found: "${location.pathname}"`, { cause: err as Error })
      }
    },
    match: (location: Location, id: string) => {
      const matchRouter = new UniversalRouterSync(matchRoutes.filter((route) => route.id === id))
      try {
        return matchRouter.resolve(location) as PathParams
      } catch {
        return undefined
      }
    },
  }
}
