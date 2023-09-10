import { AnimationState, jdumps, Animation, Animatable, GREEN, RESET, BLUE, PlayerCommand } from "./types/player";
export class CharacterInstance {
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

export class DialogInstance {
  private _content?: string
  private _speaker?: string
  private _group?: string

  constructor(content?: string, speaker?: string, group?: string) {
    this._content = content;
    this._speaker = speaker;
    this._group = group;
  }

  get content() {
    return this._content;
  }

  get speaker() {
    return this._speaker;
  }

  get group() {
    return this._group;
  }

  setValue(content?: string, speaker?: string, group?: string) {
    this._content = content;
    this._speaker = speaker;
    this._group = group;
  }
}

export class MenuInstance {
  private _hidden: boolean

  constructor(hidden = false) {
    this._hidden = hidden;
  }

  get hidden() {
    return this._hidden;
  }

  set hidden(value: boolean) {
    this._hidden = value;
  }
}

class Player {
  private _characters: (CharacterInstance | null)[] = [null, null, null, null, null]
  private _dialogInstance: DialogInstance = new DialogInstance()
  private _menuInstance: MenuInstance = new MenuInstance()
  public states: PlayerState[] = []

  get characters() {
    return this._characters;
  }

  get dialogInstance() {
    return this._dialogInstance;
  }

  get menuInstance() {
    return this._menuInstance;
  }

  get state() {
    return {
      characters: this._characters,
      dialogInstance: this._dialogInstance,
      menuInstance: this._menuInstance,
    };
  }

  /** 快照当前状态（保存当前状态为一个分镜） */
  keepStoryBoard() {
    this.states.push(this.state);
  }

  /** 设置当前状态 */
  applyStoryBoard(state: PlayerState) {
    this._characters = state.characters;
    this._dialogInstance = state.dialogInstance;
    this._menuInstance = state.menuInstance;
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
    console.log(`${ BLUE }[Dialog] ${ this._dialogInstance.speaker }: ${ this._dialogInstance.content }${ RESET }`);
    // show character
    for (const character of this._characters) {
      if (character)
        console.log(`${ BLUE }[Character] "${ character.name }" 在位置 "${ character.position }", 差分为 "${ character.face }", 表情图标为 "${ character.emotion }", 特效为 "${ character.effect }", 动画为 "${ character.animation }"${ RESET }`);
    }
  }

  execInspect() {
    console.log(`[Inspect] state = ${ jdumps(this.state) }`);
  }

  execCommand<K extends keyof PlayerCommand>(command: K, args: PlayerCommand[K]) {
    switch (command) {
      case "Character": {

      }
    }
  }

  execDialogCommand(content: string, speaker: string) {
    this._dialogInstance.setValue(content, speaker, "speaker'group");
  }

  execCharacterCommand(name: string, position: 1 | 2 | 3 | 4 | 5, face: number, emotion: string, effect?: string, animation?: Animation) {
    this._characters[position - 1] = new CharacterInstance({ name, position, effect, animation });
  }

  execHideCharacterCommand(position: 1 | 2 | 3 | 4 | 5) {
    // console.log(`${BLUE}[HideCharacter] "隐藏在位置 "${position}" 的角色, 角色名为 "${this._characters[position - 1]?.name}"${RESET}`)
    this._characters[position - 1] = null;
  }

  exec(cb: (state: PlayerState) => void) {
    cb(this.state);
  }
}

export interface PlayerState {
  characters: (CharacterInstance | null)[]
  dialogInstance: DialogInstance
  menuInstance: MenuInstance
}
