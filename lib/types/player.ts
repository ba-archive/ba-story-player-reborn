import { GetPrivateMember, KeyTuple, PlayerEvent, TypeTuple } from "@lib/types/index";
import { Spine } from "pixi-spine";
import gsap from "gsap";
import EventEmitter from "eventemitter3";
import { EventEmitterOverride, PlayerMixins } from "./type";
import { Player } from "@lib/main";
import { LoadAsset, Resource, Texture } from "pixi.js";

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

export type ResourceLoadItem = {
  param: LoadAsset;
  onComplete?: OnCompleteSignal<never>;
  loaded: boolean;
}

export type OnCompleteSignal<T> = (resource: T) => void;

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
  Hoptop: [string, number];
  Kira: string;
}

type RestrictResourceList0<T> = T extends [unknown, ...infer P] ?
  P extends [] ?
    [string] :
    [string, ...RestrictResourceList0<P>] :
  never;

type RestrictResourceList<T extends keyof AnimationType, L = AnimationType[T]> = L extends unknown[]
  ? RestrictResourceList0<L>
// eslint-disable-next-line @typescript-eslint/ban-types
  : L extends {}
    ? KeyTuple<L>
    : never;

type AnimationArg0<T extends keyof AnimationType> = EventEmitterOverride.ArgumentMap<Exclude<AnimationType, string | symbol>>[Extract<T, keyof AnimationType>];

// eslint-disable-next-line @typescript-eslint/ban-types
type AnimationArg<T extends keyof AnimationType, L = AnimationType[T]> = L extends unknown[]
  ? AnimationArg0<T> | Record<string, L[number]>
// eslint-disable-next-line @typescript-eslint/ban-types
  : L extends {}
    ? TypeTuple<L> | L
    : never;

export abstract class AnimationPlugin<T extends keyof AnimationType> {
  abstract readonly resourceNames: RestrictResourceList<T>;
  abstract animate(timeline: gsap.core.Timeline, spine: Spine, player: Player, param: AnimationArg<T>): void;
}

class A extends AnimationPlugin<"Hoptop"> {
  animate(timeline: gsap.core.Timeline, spine: Spine, player: Player, param: [string, number] | Record<string, string | number>): void {
    throw new Error("Method not implemented.");
  }
  resourceNames: ["a", "b"] = ["a", "b"];
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
    DoDumpStructure<GetPrivateMember<T, TLevel>> : T;

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
