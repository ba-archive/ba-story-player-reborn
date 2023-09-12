import { PlayerMixins } from "@lib/types/index";
import EventEmitter from "eventemitter3";
import { Player } from "@lib/main";

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

export interface PlayerInternalEvent {
  AppMounted: HTMLDivElement;
}

export type EventBus = EventEmitter<PlayerEvent, Player>;
