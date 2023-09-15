import { Player } from "@lib/main";
import { PlayerLayerInstance } from "@lib/types";

export class UiInstance extends PlayerLayerInstance<UiInstance> {
  private _hidden = false;
  private player: Player;
  constructor(_player: Player) {
    super();
    this.player = _player;
  }

  dump(): string {
    throw new Error("Method not implemented.");
  }
  restore(state: string): void {
    throw new Error("Method not implemented.");
  }

  get hidden() {
    return this._hidden;
  }

  set hidden(value: boolean) {
    this._hidden = value;
  }
}
