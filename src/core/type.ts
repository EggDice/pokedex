export type StringLiteral<T> = T extends string ? string extends T ? never : T : never

export type ObjectWithStringLitralKey<KEY, VALUE> = {
  [K in StringLiteral<KEY>]: VALUE
}
