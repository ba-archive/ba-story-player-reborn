// @ts-nocheck
import { Player } from "@lib/main";
import { EventEmitterOverride, PlayerEvent } from "./type";
import { DialogInstance } from "@lib/layers/dialog";
import { UiInstance } from "@lib/layers/ui";


// eventName: argType, eventName: [argType1, argType2]; or eventName: [argName1: argType1, argName2: argType2];
export interface PlayerInternalEvent extends PlayerEvent {
  AppMounted: HTMLDivElement;
  DialogMounted: DialogVueInstance;
  UiMounted: UiInstance;
}

export type EventBus = EventEmitterOverride.EventEmitter<PlayerInternalEvent, Player>;
export type PlayerEventBus = EventEmitterOverride.EventEmitter<PlayerEvent, Player>;
