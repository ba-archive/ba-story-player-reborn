import { ISkeletonData } from "pixi-spine";
import "pixi.js";

// eslint-disable-next-line @typescript-eslint/no-namespace
declare module "pixi.js" {
  namespace GlobalMixins {
    interface Texture {
      spineData: ISkeletonData;
    }
  }
}
