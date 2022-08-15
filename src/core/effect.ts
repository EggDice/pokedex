import { filter } from 'rxjs/operators'

import type { OperatorFunction, Observable } from 'rxjs'
import type { CoreEvent } from '@core/store'

export type CoreEffectFunction<EVENT extends CoreEvent> =
 (event$: Observable<EVENT>) => Observable<EVENT>

export interface CoreEffect<EVENT extends CoreEvent> {
  [key: string]: CoreEffectFunction<EVENT>
}

export const filterByType = <
  ALL_EVENTS extends CoreEvent,
  TYPE_STRING = string,
  EVENT extends CoreEvent = Extract<{ type: TYPE_STRING }, ALL_EVENTS>,
> (selectedType: TYPE_STRING): OperatorFunction<CoreEvent, EVENT> =>
    filter(({ type }) => type === selectedType) as OperatorFunction<CoreEvent, EVENT>
