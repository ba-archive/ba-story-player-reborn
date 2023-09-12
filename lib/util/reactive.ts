import { EventBus } from "@lib/types/event";
import { inject } from "vue";

export function injectEventBus() {
  return inject("event") as EventBus;
}

export function injectUuid() {
  return inject("uuid") as string;
}
