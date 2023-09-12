import { PlayerMixins } from "@lib/types/index";
import { Spine } from "pixi-spine";
import gsap from "gsap";
import EventEmitter from "eventemitter3";

export const RED = "\x1B[31m";
export const BLUE = "\x1B[34m";
export const GREEN = "\x1B[32m";
export const RESET = "\x1B[0m";

export function jloads(text: string): any {
  return JSON.parse(text);
}

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
export interface AnimationType extends PlayerMixins.AnimationType, Record<string, unknown> {
  Hoptop: [timeline: gsap.core.Timeline, student: Spine];
  Kira: [s: string];
}

abstract class AnimationPlugin<T extends keyof AnimationType> {
  abstract target: T;
  abstract animate(...param: EventEmitter.ArgumentMap<Exclude<AnimationType, string | symbol>>[Extract<T, keyof AnimationType>]): void;
}

