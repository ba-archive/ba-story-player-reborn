import { Player } from "@lib/main";

const initPlayer = function(mountPoint: HTMLElement) {
  return new Player(mountPoint, "https://yuuka.cdn.diyigemt.com/image/ba-all-data/");
};
export default initPlayer;
