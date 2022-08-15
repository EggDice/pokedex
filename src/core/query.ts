import { map } from 'rxjs/operators'
import type { Observable } from 'rxjs'
import type { StateReadable } from './store'

export const getDummyState = <STATE> (key: string) =>
  (in$: Observable<any>): StateReadable<STATE> => ({
    // We are faking a whole state so needs to force casting is needed
    state$: in$.pipe(map(x => ({ [key]: x } as unknown as STATE))),
  })
