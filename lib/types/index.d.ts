import "pixi.js";
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

declare namespace PlayerMixins {
  interface PlayerEvent {

  }
  interface AnimationType {

  }
}
