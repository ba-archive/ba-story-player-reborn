import { GetPrivateMember, PlayerEvent } from "@lib/types/index";
import { Spine } from "pixi-spine";
import gsap from "gsap";
import EventEmitter from "eventemitter3";
import { EventEmitterOverride, PlayerMixins } from "./type";

export const RED = "\x1B[31m";
export const BLUE = "\x1B[34m";
export const GREEN = "\x1B[32m";
export const RESET = "\x1B[0m";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function jloads(text: string): any {
  return JSON.parse(text);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function jdumps(obj: any): string {
  return JSON.stringify(obj, null, 2) || "";
}

export interface Effect {
  color: string
  scale: number
  skew: [number, number]
}

export interface AnimationState {
  position?: [number, number] // absolute position
  effect?: Effect
}

export interface Animatable {
  position: [number, number]
  effect: Effect
  animationState: AnimationState
}

export interface Animation {
  readonly name: string
  delay: number
  duration: number
  iterationCount: number
  animate: (obj: Animatable, timeline: number) => void
  final: (obj: Animatable) => void
}
export interface AnimationType extends PlayerMixins.AnimationType {
  Hoptop: [timeline: gsap.core.Timeline, student: Spine];
  Kira: string;
}

abstract class AnimationPlugin<T extends keyof AnimationType> {
  abstract readonly target: T;
  abstract animate(...param: EventEmitterOverride.ArgumentMap<Exclude<AnimationType, string | symbol>>[Extract<T, keyof AnimationType>]): void;
}

export type PlayerEventKey = EventEmitterOverride.EventNames<PlayerEvent>;

export type PlayerEventArg<K extends PlayerEventKey> = EventEmitterOverride.EventArgs<PlayerEvent, K>;

export type PlayerEventListener<K extends PlayerEventKey> = EventEmitterOverride.EventListener<PlayerEvent, K>;

export type GeneraPlayerLayer = PlayerLayerInstance<unknown>;

type DoDumpStructure<T> = T extends object ?
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [P in keyof T]: T[P] extends PlayerLayerInstance<any, infer TSelf> ?
      DumpStructure<T[P], TSelf> :
      T[P]
  } :
  T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DumpStructure<T, TLevel = any> = T extends object ?
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TLevel extends PlayerLayerInstance<any> ?
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DoDumpStructure<GetPrivateMember<T, PlayerLayerInstance<any>>> :
    DoDumpStructure<GetPrivateMember<T>> :
  T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class PlayerLayerInstance<T, TLevel = any> {
  dump(): DumpStructure<T, TLevel> {
    const res = {};
    Object.keys(this)
      .filter((key) => key.startsWith("_"))
      .forEach((key) => {
        const t = Reflect.get(this, key);
        const k = key.replace("_", "");
        if (t instanceof PlayerLayerInstance) {
          Reflect.set(res, k, t.dump());
        } else {
          Reflect.set(res, k, t);
        }
      });
    return res as DumpStructure<T, TLevel>;
  }
  abstract restore(state: DumpStructure<T, TLevel>): void;
}

export type DialogVueInstance = {
  content: Ref<string>;
  showText(...arges: PlayerEventArg<"Dialog">): void;
}
