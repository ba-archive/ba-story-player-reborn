import "pixi.js";
import gsap from "gsap";
import { Spine } from "pixi-spine";
import { Player } from "@lib/main";
import { ResourceLoadItem } from "@lib/types/typescript";
declare module "pixi.js" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export interface LoadAsset<T = any> {
    name: string;
  }
}
declare global {
  interface Window {
    resourceMap: Map<string, ResourceLoadItem>;
  }
}

declare namespace EventEmitterOverride {

  declare class EventEmitter<
  EventTypes extends EventEmitter.ValidEventTypes = string | symbol,
  Context = any
> {
  static prefixed: string | boolean;

  /**
   * Return an array listing the events for which the emitter has registered
   * listeners.
   */
  eventNames(): Array<EventEmitterOverride.EventNames<EventTypes>>;

  /**
   * Return the listeners registered for a given event.
   */
  listeners<T extends EventEmitterOverride.EventNames<EventTypes>>(
    event: T
  ): Array<EventEmitterOverride.EventListener<EventTypes, T>>;

  /**
   * Return the number of listeners listening to a given event.
   */
  listenerCount(event: EventEmitterOverride.EventNames<EventTypes>): number;

  /**
   * Calls each of the listeners registered for a given event.
   */
  emit<T extends EventEmitterOverride.EventNames<EventTypes>>(
    event: T,
    ...args: EventEmitterOverride.EventArgs<EventTypes, T>
  ): boolean;

  /**
   * Add a listener for a given event.
   */
  on<T extends EventEmitterOverride.EventNames<EventTypes>>(
    event: T,
    fn: EventEmitterOverride.EventListener<EventTypes, T>,
    context?: Context
  ): this;
  addListener<T extends EventEmitterOverride.EventNames<EventTypes>>(
    event: T,
    fn: EventEmitterOverride.EventListener<EventTypes, T>,
    context?: Context
  ): this;

  /**
   * Add a one-time listener for a given event.
   */
  once<T extends EventEmitterOverride.EventNames<EventTypes>>(
    event: T,
    fn: EventEmitterOverride.EventListener<EventTypes, T>,
    context?: Context
  ): this;

  /**
   * Remove the listeners of a given event.
   */
  removeListener<T extends EventEmitterOverride.EventNames<EventTypes>>(
    event: T,
    fn?: EventEmitterOverride.EventListener<EventTypes, T>,
    context?: Context,
    once?: boolean
  ): this;
  off<T extends EventEmitterOverride.EventNames<EventTypes>>(
    event: T,
    fn?: EventEmitterOverride.EventListener<EventTypes, T>,
    context?: Context,
    once?: boolean
  ): this;

  /**
   * Remove all listeners, or those of the specified event.
   */
  removeAllListeners(event?: EventEmitterOverride.EventNames<EventTypes>): this;
  }

  export interface ListenerFn<Args extends any[] = any[]> {
    (...args: Args): void;
  }

  export interface EventEmitterStatic {
    new <
      EventTypes extends ValidEventTypes = string | symbol,
      Context = any
    >(): EventEmitter<EventTypes, Context>;
  }

  /**
   * `object` should be in either of the following forms:
   * ```
   * interface EventTypes {
   *   'event-with-parameters': any[]
   *   'event-with-example-handler': (...args: any[]) => void
   * }
   * ```
   */
  export type ValidEventTypes = string | symbol | object;

  export type EventNames<T extends ValidEventTypes> = T extends string | symbol
    ? T
    : keyof T;

  export type ArgumentMap<T extends object> = {
    [K in keyof T]: T[K] extends (...args: any[]) => void
      ? Parameters<T[K]>
      : T[K] extends any[] ?
        T[K] :
        [T[K]]
  };

  type ToSingleArgFn<TArg> = TArg extends any[] ? (TArg extends [any] ? (arg: TArg[0]) => void : (...args: TArg) => void) : (arg: TArg) => void;

  export type EventListener<
    T extends ValidEventTypes,
    K extends EventNames<T>
  > = T extends string | symbol
    ? (...args: any[]) => void
    : ToSingleArgFn<ArgumentMap<Exclude<T, string | symbol>>[Extract<K, keyof T>]>;

  export type EventArgs<
    T extends ValidEventTypes,
    K extends EventNames<T>
  > = Parameters<EventListener<T, K>>;

  export const EventEmitter: EventEmitterStatic;
}


declare namespace PlayerMixins {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface PlayerEvent {}
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface AnimationType {}
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AnimationType extends PlayerMixins.AnimationType {}

type RestrictResourceList<T extends keyof AnimationType, L = AnimationType[T]> = L extends unknown[]
  ? RestrictResourceList0<L>
  : L extends object
    ? KeyTuple<L>
    : [L] extends [never | undefined | null]
      ? null
      : RestrictResourceList0<[T]>;

type AnimationArg0<T extends keyof AnimationType> = EventEmitterOverride.ArgumentMap<Exclude<AnimationType, string | symbol>>[Extract<T, keyof AnimationType>];

// eslint-disable-next-line @typescript-eslint/ban-types
type AnimationArg<T extends keyof AnimationType, L = AnimationType[T]> = L extends unknown[]
  ? AnimationArg0<T> | Record<string, L[number]>
  : L extends object
    ? TypeTuple<L> | L
    : AnimationArg0<[T]> | Record<string, L[number]>;

export abstract class AnimationPlugin<T extends keyof AnimationType> {
  readonly target: T;
  readonly baseUrl: string = ""; // 默认资源加载路径, 相对于cdn的baseUrl
  abstract readonly resourceNames: RestrictResourceList<T>;
  abstract animate(timeline: gsap.core.Timeline, spine: Spine, player: Player, param: AnimationArg<T>): void;
}

// eventName: argType, eventName: [argType1, argType2]; or eventName: [argName1: argType1, argName2: argType2];
export interface PlayerEvent extends PlayerMixins.PlayerEvent {
  // high level api
  Title: [title: string, subTitle: string];
  Place: {};
  Voice: {

  };
  Episode: {

  }; /** continued; nextEpisode */
  BGM: {

  };
  ClearBGM: {

  };
  Dialog: [text: string];
  HideDialog: {

  };
  Select: {

  };
  Character: {

  };
  HideCharacter: {

  };
  ST: {

  };
  ClearST: {

  }; /** Clear */
  Background: {

  };
  Config: {

  };
  Video: {

  };
  ClearVideo: {

  };
  Effect: {

  }; /** apply prefab effect to object */
  // legacy api
  FontSize: {

  }; /** Dialog */
  HideMenu: {

  }; /** Set */
  ShowMenu: {

  }; /** Set */
  ZMC: {

  }; /** Set */
  BGShake: {

  }; /** Effect */
  // low level api
  Load: {

  }; /** load object */
  Call: {

  }; /** call object method */
  Get: {

  }; /** get object */
  Set: {

  }; /** operate object */
  Clear: {

  }; /** clear st, delete object */
}