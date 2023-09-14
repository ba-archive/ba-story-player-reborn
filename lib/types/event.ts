import { DialogInstance, Player, UiInstance } from "@lib/main";
import { EventEmitterOverride, PlayerMixins } from "./type";

// eventName: argType, eventName: [argType1, argType2]; or eventName: [argName1: argType1, argName2: argType2];

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
  Dialog: [text: string];
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
// eventName: argType, eventName: [argType1, argType2]; or eventName: [argName1: argType1, argName2: argType2];
export interface PlayerInternalEvent {
  AppMounted: HTMLDivElement;
  DialogMounted: DialogInstance;
  UiMounted: UiInstance;
}

export type EventBus = EventEmitterOverride.EventEmitter<PlayerEvent, Player>;
