import { Player } from "@lib/main";
import { AnimationPlugin } from "@lib/types";
import { Spine } from "pixi-spine";

declare module "@lib/types" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace PlayerMixins {
    interface AnimationType {
      Hoptop: undefined;
    }
  }
}

export default class HoptopAnimation extends AnimationPlugin<"Hoptop"> {
  resourceNames = null;
  animate(timeline: gsap.core.Timeline, spine: Spine, player: Player, param: Record<string, unknown>): void {

  }
}
