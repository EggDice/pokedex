import { filter } from 'rxjs/operators'

import type { OperatorFunction, Observable } from 'rxjs'
import type { StoreEvent, PayloadStoreEvent } from './store'

export type CoreEffectFunction<T extends Event> =
 (event$: Observable<T>) => Observable<T>

export interface CoreEffect<T extends Event> {
  [key: string]: CoreEffectFunction<T>
}

type Event = StoreEvent | PayloadStoreEvent

export const filterByType = <
  ALL_EVENTS extends Event,
  TYPE_STRING = string,
  EVENT extends Event = Extract<{ type: TYPE_STRING }, ALL_EVENTS>,
> (selectedType: TYPE_STRING): OperatorFunction<Event, EVENT> =>
    filter(({ type }) => type === selectedType) as OperatorFunction<Event, EVENT>
