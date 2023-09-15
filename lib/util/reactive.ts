import { Player } from "@lib/main";
import { EventBus } from "@lib/types/event";
import { inject } from "vue";

export function injectPlayer() {
  return inject("player") as Player;
}

export function injectEventBus() {
  return inject("event") as EventBus;
}

export function injectUuid() {
  return inject("uuid") as string;
}
