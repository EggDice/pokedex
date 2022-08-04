import { marbles } from 'rxjs-marbles/jest'
import type { TestObservableLike, ExpectHelpers } from 'rxjs-marbles/types'
import { Expect } from 'rxjs-marbles/expect'
import type { Observable } from 'rxjs'

type Marbles = typeof marbles
type MarblesRunner = Parameters<Marbles>[0]
type MarblesParam = Parameters<MarblesRunner>[0]
type Runner = (m: MarblesExtensions) => ReturnType<MarblesRunner>
type MarbleFunctions = Record<string, () => void>

interface MarblesExtensions extends MarblesParam {
  coldCall: (marble: string, functions: MarbleFunctions) => void
  coldBoolean: (marble: string) => TestObservableLike<boolean>
  expect: <T = any> (actual: Observable<T>, subscription?: string) => ExtendedExpect<T>
};

class ExtendedExpect<T> extends Expect<T> {
  constructor (
    private readonly actual_: Observable<T>,
    private readonly helpers_: ExpectHelpers,
    private readonly subscription_?: string,
  ) {
    super(actual_, helpers_, subscription_)
  }

  toBeObservableBoolean (marble: string): void {
    this.toBeObservable(marble, MARBLES_BOOLEAN as any)
  }
}

export const coreMarbles = (runner: Runner): (() => void) => marbles((m) => {
  const coldCall = (marble: string, functions: MarbleFunctions): void => {
    const marbleDefinition = Object.fromEntries(
      Object.keys(functions).map((key) => [key, key]),
    )
    m.cold(marble, marbleDefinition)
      .subscribe((key) => functions[key]())
  }
  const coldBoolean = (marble: string): TestObservableLike<boolean> =>
    m.cold(marble, MARBLES_BOOLEAN)

  // This function and the ExtendedExpect depends on internals of the `rxjs-marbles` library
  // potentially not future proof
  const expect = <T = any>(actual: Observable<T>, subscription?: string): ExtendedExpect<T> => {
    const { helpers_ } = m as any
    return new ExtendedExpect(actual as any, helpers_, subscription)
  }

  return runner(
    // The methods on `m` (the RunContext) are on the prototype, so we have to use mutation
    Object.assign(
      m,
      {
        coldCall,
        coldBoolean,
        expect,
      },
    ))
})

export const MARBLES_BOOLEAN = {
  t: true,
  f: false,
}
