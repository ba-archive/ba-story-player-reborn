import { createApp } from "vue";
import BaStoryPlayer from "./BaStoryPlayer.vue";
import { initResourceManager } from "./global/resourceManager";
import { uuid } from "./util";

const initPlayer = function(mountPoint: HTMLElement) {
  const _uuid = uuid();
  const app = createApp(BaStoryPlayer);
  app.provide("uuid", _uuid).mount(mountPoint);
  const resource = initResourceManager();
};

export default initPlayer;
