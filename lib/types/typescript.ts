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

export type OnCompleteSignal<T> = (resource: T) => void;

export type ResourceLoadItem = {
  param: LoadAsset;
  onComplete?: OnCompleteSignal<never>;
  loaded: boolean;
}
