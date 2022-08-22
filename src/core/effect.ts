import { filter } from 'rxjs/operators'

import type { OperatorFunction, Observable } from 'rxjs'
import type { CoreEvent } from '@core/store'
import type { StringLiteral } from '@core/type'

export type CoreEffectFunction<EVENT extends CoreEvent> =
 (event$: Observable<EVENT>) => Observable<EVENT>

export interface CoreEffect<EVENT extends CoreEvent> {
  [key: string]: CoreEffectFunction<EVENT>
}

type GetByType<ALL, TYPE_STRING> = Extract<ALL, { type: StringLiteral<TYPE_STRING> }>

type FilterOperatorFunction<ALL_EVENTS, TYPE_STRING> =
  OperatorFunction<ALL_EVENTS, GetByType<ALL_EVENTS, TYPE_STRING>>

export const filterByType = <
  ALL_EVENTS extends CoreEvent,
  TYPE_STRING,
> (selectedType: TYPE_STRING): FilterOperatorFunction<ALL_EVENTS, TYPE_STRING> =>
    filter(({ type }) => type === selectedType) as FilterOperatorFunction<ALL_EVENTS, TYPE_STRING>
