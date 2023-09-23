import { Player } from "@lib/main";

const initPlayer = function(mountPoint: HTMLElement) {
  const p = new Player(mountPoint, "https://yuuka.cdn.diyigemt.com/image/ba-all-data/");
  Reflect.set(window, "p", p);
};
export default initPlayer;