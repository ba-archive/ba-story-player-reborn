type GetPrivateMemberName<T> = T extends `_${infer Left}` ? Left : never;

type GetPrivateMemberAsNever<T> = {
  [P in keyof T]: GetPrivateMemberName<P> extends never ? never : T[P];
}
type RemoveNever<T> = {
  [P in keyof T as T[P] extends never ? never : GetPrivateMemberName<P>]: T[P];
}

export type GetPrivateMember<T> = RemoveNever<GetPrivateMemberAsNever<T>>;
