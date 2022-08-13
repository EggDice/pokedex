import { fromEventPattern } from 'rxjs'
import type { History, Location as HistoryLocation } from 'history'
import type { Observable } from 'rxjs'

interface NavigationService {
  getLocation: () => Location
  push: (location: Location) => void
  location$: Observable<Location>
}

interface Location {
  pathname: string
  search: URLSearchParams
  hash: string
}

export const createNavigationService = (history: History): NavigationService => {
  return {
    getLocation () {
      return toLocation(history.location)
    },
    push (location: Location) {
      history.push(toHistoryLocation(location))
    },
    location$: fromEventPattern(
      (handler) => history.listen(handler),
      (_, cancel) => cancel(),
      ({ location }) => toLocation(location),
    ),
  }
}

const toHistoryLocation = ({ pathname, hash, search }: Location): Partial<HistoryLocation> => ({
  pathname,
  hash,
  search: search.toString(),
})

const toLocation = ({ pathname, hash, search }: HistoryLocation): Location => ({
  pathname,
  hash,
  search: new URLSearchParams(search),
})
