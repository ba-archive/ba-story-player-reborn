import { LoadAsset } from "pixi.js";

type GetPrivateMemberName<T> = T extends `_${infer Left}` ? Left : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GetPrivateMemberAsNever<T, TFather = any> = {
  [P in keyof T]: GetPrivateMemberName<P> extends never ? never : T[P] extends TFather ? T[P] : never;
}
type RemoveNever<T> = {
  [P in keyof T as T[P] extends never ? never : GetPrivateMemberName<P>]: T[P];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GetPrivateMember<T, TFather = any> = RemoveNever<GetPrivateMemberAsNever<T, TFather>>;

type UnionToIntersection<U> = (
  U extends unknown ? (arg: U) => 0 : never
) extends (arg: infer I) => 0
  ? I
  : never;


type LastInUnion<U> = UnionToIntersection<
  U extends unknown ? (x: U) => 0 : never
> extends (x: infer L) => 0
  ? L
  : never;

type UnionToTuple<U, Last = LastInUnion<U>> = [U] extends [never]
  ? []
  : [...UnionToTuple<Exclude<U, Last>>, Last];

// eslint-disable-next-line @typescript-eslint/ban-types
export type KeyTuple<T extends {}> = UnionToTuple<keyof T>;

type ObjectTypes<T, U = Required<T>> = {
  [K in keyof U]: [K, U[K] extends never ? undefined : U[K]]
}[keyof U];

type FlatType0<T> = T extends [string, infer Type]
  ? Type
  : never;

type FlatType<T extends unknown[]> = T extends [infer F, ...infer R]
  ? R extends []
    ? [FlatType0<F>]
    : [FlatType0<F>, ...FlatType<R>]
  : T

// eslint-disable-next-line @typescript-eslint/ban-types
export type TypeTuple<T extends {}> = FlatType<UnionToTuple<ObjectTypes<T>>>;
