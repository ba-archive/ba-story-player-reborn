import { useStorage } from "@vueuse/core";
import { MaybeRef } from "vue";

export function useJSONStorage<T = any>(key: string, initValue: MaybeRef<T>) {
  return useStorage<T>(key, initValue, localStorage, {
    serializer: {
      read: (v: string) => v ? JSON.parse(v) : null,
      write: (v: any) => JSON.stringify(v),
    },
  })
}