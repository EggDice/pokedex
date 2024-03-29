import { filter } from 'rxjs/operators'

import type { OperatorFunction, Observable } from 'rxjs'
import type { CoreEvent } from '@core/store'
import type { StringLiteral } from '@core/type'

export type CoreEffectFunction<STATE, EVENT extends CoreEvent> =
 (event$: Observable<EVENT>, state$: Observable<STATE>) => Observable<EVENT>

export type CoreEffect<
  STATE,
  EVENT extends CoreEvent,
  EFFECTS extends string,
> = {
  [key in EFFECTS]: CoreEffectFunction<STATE, EVENT>
}

type GetByType<ALL, TYPE_STRING> = Extract<ALL, { type: StringLiteral<TYPE_STRING> }>

type FilterOperatorFunction<ALL_EVENTS, TYPE_STRING> =
  OperatorFunction<ALL_EVENTS, GetByType<ALL_EVENTS, TYPE_STRING>>

export const filterByType = <
  ALL_EVENTS extends CoreEvent,
  TYPE_STRING,
> (selectedType: TYPE_STRING): FilterOperatorFunction<ALL_EVENTS, TYPE_STRING> =>
    filter(({ type }) => type === selectedType) as FilterOperatorFunction<ALL_EVENTS, TYPE_STRING>
