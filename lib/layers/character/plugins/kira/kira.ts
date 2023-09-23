import { Player } from "@lib/main";
import { AnimationPlugin } from "@lib/types/type";
import { Spine } from "pixi-spine";
import { Resource, Texture } from "pixi.js";

declare module "@lib/types/type" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace PlayerMixins {
    interface AnimationType {
      Kira: {
        "Kira.png": Texture
      };
    }
  }
}

export default class KiraAnimation extends AnimationPlugin<"Kira"> {
  readonly resourceNames: ["Kira.png"] = ["Kira.png"];
  animate(timeline: gsap.core.Timeline, spine: Spine, player: Player, param: { "Kira.png": Texture<Resource>; }): void {
    throw new Error("Method not implemented.");
  }

}
