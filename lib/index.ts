import { createApp } from "vue";
import BaStoryPlayer from "./BaStoryPlayer.vue";

export function initPlayer(mountPoint: HTMLElement) {
  const app = createApp(BaStoryPlayer);
  app.mount(mountPoint);
}
