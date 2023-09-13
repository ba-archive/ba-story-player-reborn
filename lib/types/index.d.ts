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
  // 必须这么定义 eventName: [argType1, argType2]; or eventName: [argName1: argType1, argName2: argType2];
  // 要不然ts不高兴
  interface PlayerEvent {

  }
  interface AnimationType {

  }
}
