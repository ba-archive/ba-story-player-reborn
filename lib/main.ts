import { GREEN, RESET } from "./types/player";
import { initResourceManager, ResourceManager } from "@lib/global/resourceManager";
import { App } from "vue";
import { uuid } from "@lib/util";
import { createApp } from "vue";
import BaStoryPlayer from "@lib/BaStoryPlayer.vue";
import { EventBus, PlayerEventBus } from "@lib/types/event";
import EventEmitter from "eventemitter3";
import { Application, BaseTexture, ICanvas } from "pixi.js";
import { DialogVueInstance, DumpStructure, GeneraPlayerLayer, PlayerEventArg, PlayerEventKey, PlayerEventListener, PlayerLayerInstance } from "./types";
import { CharacterInstance } from "./layers/character";
import { UiInstance } from "./layers/ui";
import { DialogInstance } from "./layers/dialog";
import "pixi-spine";
import { PlayerEvent } from "@lib/types/type";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PlayerDumpType = DumpStructure<Player, GeneraPlayerLayer>;
export class Player extends PlayerLayerInstance<Player, GeneraPlayerLayer> implements PlayerEventBus {
  //@ts-ignore
  public _characterInstance: CharacterInstance;
  //@ts-ignore
  public _dialogInstance: DialogInstance;
  //@ts-ignore
  public _menuInstance: UiInstance;
  public _resourceManager: ResourceManager;
  public _vueInstance: App<Element>;
  //@ts-ignore
  public _pixiInstance: Application<ICanvas>;
  public _event: EventBus;
  public _uuid: string;
  public states: PlayerDumpType[] = []

  constructor(mountPoint: HTMLElement, baseUrl: string) {
    super();
    this._uuid = uuid();
    this._resourceManager = initResourceManager(baseUrl);
    this._event = new EventEmitter<PlayerEvent, Player>() as EventBus;
    this.initEvent();
    const app = createApp(BaStoryPlayer);
    app
      .provide("uuid", this._uuid)
      .provide("event", this._event)
      .mount(mountPoint);
    this._vueInstance = app;
  }

  private initEvent() {
    this._event.once("AppMounted", this.initPixi, this);
    this._event.once("DialogMounted", this.initDialog, this);
  }

  private initDialog(exports: DialogVueInstance) {
    this._dialogInstance = new DialogInstance(exports, this);
  }

  private initPixi(el: HTMLDivElement) {
    BaseTexture.defaultOptions.mipmap = 2;
    const app = new Application({
      width: 1440,
      height: 810,
      resizeTo: el,
    });
    el.appendChild(app.view as unknown as Node);
    app.stage.sortableChildren = true;
    globalThis.__PIXI_APP__ = app;
    this._pixiInstance = app;
    this._characterInstance = new CharacterInstance(this);
  }

  getResource<T>(nameOrId: string) {
    return this._resourceManager.get<T>(nameOrId);
  }

  // 保存当前画布, // 可能无法保存时轴?
  dump() {
    // TODO
    return {
      characterInstance: "",
      dialogInstance: "",
      menuInstance: "",
    };
  }

  // 还原当前画布
  restore(state: PlayerDumpType) {
    // TODO

  }

  get characterInstance() {
    return this._characterInstance;
  }

  get dialogInstance() {
    return this._dialogInstance;
  }

  get menuInstance() {
    return this._menuInstance;
  }

  get state() {
    return this.dump();
  }

  /** 快照当前状态（保存当前状态为一个分镜） */
  keepStoryBoard() {
    this.states.push(this.state);
  }

  /** 设置当前状态 */
  applyStoryBoard(state: PlayerDumpType) {
    console.log("apply");
  }

  /** 创建分镜 */
  withStoryBoard(cb: (player: Player) => void) {
    console.log(`${ GREEN }====== enter new story board ======${ RESET }`);
    cb(this);
    this.keepStoryBoard();
    this.playStoryBoard();
    this.execInspect();
  }

  /** 回退分镜 */
  backward() {
    const state = this.states.pop();
    state && this.applyStoryBoard(state);
  }

  /** 播放当前分镜，发送信息给 Player（通过 PlayerCommandType），展示分镜 */
  playStoryBoard() {
    // console.log(`${ BLUE }[Dialog] ${ this._dialogInstance.speaker }: ${ this._dialogInstance.content }${ RESET }`);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  execInspect() {
    
  }

  execCommand<K extends keyof PlayerEvent>(command: K, ...args: PlayerEventArg<K>) {
    switch (command) {
      case "Character": {
        break;
      }
      case "Dialog": {
        const a = args as PlayerEventArg<"Dialog">;
        this._dialogInstance.showText(...a);
        break;
      }
    }
  }

  eventNames() {
    return (this._event as unknown as PlayerEventBus).eventNames();
  }

  listeners<T extends PlayerEventKey>(
    event: T
  ) {
    return (this._event as unknown as PlayerEventBus).listeners(event);
  }

  listenerCount(event: PlayerEventKey) {
    return (this._event as unknown as PlayerEventBus).listenerCount(event);
  }

  emit<T extends PlayerEventKey>(
    event: T,
    ...args: PlayerEventArg<T>
  ) {
    return (this._event as unknown as PlayerEventBus).emit(event, ...args);
  }

  on<K extends PlayerEventKey>(
    event: K,
    fn: PlayerEventListener<K>,
    context?: Player
  ) {
    (this._event as unknown as PlayerEventBus).on(event, fn, context);
    return this;
  }
  addListener<K extends PlayerEventKey>(
    event: K,
    fn: PlayerEventListener<K>,
    context?: Player
  ) {
    (this._event as unknown as PlayerEventBus).addListener(event, fn, context);
    return this;
  }

  once<K extends PlayerEventKey>(
    event: K,
    fn: PlayerEventListener<K>,
    context?: Player
  ) {
    (this._event as unknown as PlayerEventBus).once(event, fn, context);
    return this;
  }

  removeListener<K extends PlayerEventKey>(
    event: K,
    fn?: PlayerEventListener<K>,
    context?: Player,
    once?: boolean
  ) {
    (this._event as unknown as PlayerEventBus).removeListener(event, fn, context, once);
    return this;
  }

  off<K extends PlayerEventKey>(
    event: K,
    fn?: PlayerEventListener<K>,
    context?: Player,
    once?: boolean
  ) {
    (this._event as unknown as PlayerEventBus).off(event, fn, context, once);
    return this;
  }

  removeAllListeners(event?: PlayerEventKey) {
    this._event.removeAllListeners(event);
    return this;
  }
}

export interface PlayerState {
  characterInstance: CharacterInstance
  dialogInstance: DialogInstance
  menuInstance: UiInstance
}
