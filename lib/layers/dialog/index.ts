import { Player } from "@lib/main";
import { DialogVueInstance, PlayerEventArg, PlayerLayerInstance } from "@lib/types";

export class DialogInstance extends PlayerLayerInstance<DialogInstance> {
  private _vueInstance: DialogVueInstance
  private player: Player;
  constructor(vue: DialogVueInstance, _player: Player) {
    super();
    this._vueInstance = vue;
    this.player = _player;
  }

  dump(): string {
    return this._vueInstance.content.value;
  }
  restore(state: string): void {
    this._vueInstance.showText(state);
  }

  showText(...args: PlayerEventArg<"Dialog">) {
    this._vueInstance.showText(...args);
  }
}
