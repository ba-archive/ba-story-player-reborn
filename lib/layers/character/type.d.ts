import { ISkeletonData } from "pixi-spine";

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace GlobalMixins {
  interface Texture {
    spineData: ISkeletonData;
  }
}
