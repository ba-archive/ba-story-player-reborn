import { Player } from "@lib/main";
import { AnimationState, Animatable, Animation, PlayerLayerInstance, AnimationType, AnimationPlugin } from "@lib/types";
import { Spine } from "pixi-spine";
import { Container, Texture } from "pixi.js";


export class CharacterInstance extends PlayerLayerInstance<CharacterInstance> {
  private _player: Player;
  private _container: Container;
  private _state = new Map<number, Spine>();
  private _plugins = new Map<keyof AnimationType, AnimationPlugin<keyof AnimationType>[]>
  constructor(_player: Player) {
    super();
    this._player = _player;
    this._container = new Container();
    this._player._pixiInstance.stage.addChild(this._container);
  }
  putCharacter(id: string) {
    const resource = this._player.getResource<Spine>(id);
    if (resource) {
      const ch = new Spine(resource.spineData);
      this._container.addChild(ch);
      this._state.set(1, ch);
    }
  }
  animate(position: number, type: keyof AnimationType) {
    const plugins = this._plugins.get(type);
    if (plugins) {
      const spine = this._state.get(position);
      if (spine) {
        const timeline = gsap.timeline();
        plugins.forEach((plugin) => {
          plugin.animate(timeline, spine);
        });
      }
    }
  }
  registerPlugin<T extends keyof AnimationType>(type: T, plugin: AnimationPlugin<T>) {
    const exist = this._plugins.get(type);
    if (exist) {
      exist.push(plugin);
    } else {
      this._plugins.set(type, [plugin]);
    }
  }
  override dump() {
    return super.dump();
  }
  restore(state: string): void {
    throw new Error("Method not implemented.");
  }
}

export class Character {
  private _name: string
  private _group: string
  private _position: 1 | 2 | 3 | 4 | 5
  private _face: number
  private _emotion: string
  private _effect?: string
  /** 对元素图层操作 */
  private _animation?: Animation
  /** 控制元素坐标（transform），不会改变 position */
  private _animationState: AnimationState = {}

  constructor(args: { name: string; position: 1 | 2 | 3 | 4 | 5; effect?: string; animation?: Animation }) {
    this._name = args.name;
    this._group = "group";
    this._position = args.position;
    this._face = 1;
    this._emotion = "emotion";
    this._effect = args.effect;
    this._animation = args.animation;
  }

  get name() {
    return this._name;
  }

  get group() {
    return this._group;
  }

  get position() {
    return this._position;
  }

  get emotion() {
    return this._emotion;
  }

  get face() {
    return this._face;
  }

  get effect() {
    return this._effect;
  }

  get animation() {
    return this._animation;
  }

  get animationState() {
    return this._animationState;
  }
}

// example implements of Animation, consider ScreenX === 1600
class MoveLeft implements Animation {
  readonly name = "move-left"
  delay: number
  duration: number
  iterationCount: number

  constructor(delay = 0, duration = 1000, iterationCount = 1) {
    this.delay = delay;
    this.duration = duration;
    this.iterationCount = iterationCount;
  }

  animate(obj: Animatable, timeline: number) {
    // position[0] is x, move left 320 px, duration 1000ms, fps is 60, animate() calls 60 times, every time move left 320 / 60px
    obj.animationState.position = [obj.position[0] - 320 * timeline / 1000, obj.position[1]];
  }

  final(obj: Animatable) {
    obj.position[0] = obj.position[0] - 320;
    obj.animationState = {};
  }

  toString() {
    return `[Animation name="${ this.name }"]`;
  }
}
