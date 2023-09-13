import { PlayerMixins } from "@lib/types/index";
import { EventEmitter } from "eventemitter3";
import { DialogInstance, Player, UiInstance } from "@lib/main";

// 必须这么定义 eventName: [argType1, argType2]; or eventName: [argName1: argType1, argName2: argType2];
// 要不然ts不高兴
export interface PlayerEvent extends PlayerInternalEvent, PlayerMixins.PlayerEvent {
  // high level api
  Title: [title: string, subTitle: string];
  Place: {

  };
  Voice: {

  };
  Episode: {

  }; /** continued; nextEpisode */
  BGM: {

  };
  ClearBGM: {

  };
  Dialog: {

  };
  HideDialog: {

  };
  Select: {

  };
  Character: {

  };
  HideCharacter: {

  };
  ST: {

  };
  ClearST: {

  }; /** Clear */
  Background: {

  };
  Config: {

  };
  Video: {

  };
  ClearVideo: {

  };
  Effect: {

  }; /** apply prefab effect to object */
  // legacy api
  FontSize: {

  }; /** Dialog */
  HideMenu: {

  }; /** Set */
  ShowMenu: {

  }; /** Set */
  ZMC: {

  }; /** Set */
  BGShake: {

  }; /** Effect */
  // low level api
  Load: {

  }; /** load object */
  Call: {

  }; /** call object method */
  Get: {

  }; /** get object */
  Set: {

  }; /** operate object */
  Clear: {

  }; /** clear st, delete object */
}
// 必须这么定义 eventName: [argType1, argType2]; or eventName: [argName1: argType1, argName2: argType2];
// 要不然ts不高兴
export interface PlayerInternalEvent {
  AppMounted: [el: HTMLDivElement];
  DialogMounted: [instance: DialogInstance];
  UiMounted: [instance: UiInstance];
}

export type EventBus = EventEmitter<PlayerEvent, Player>;
