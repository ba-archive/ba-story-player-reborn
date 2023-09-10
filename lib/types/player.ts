export type PlayerCommand = {
  // high level api
  Title: {

  };
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

export const RED = "\x1B[31m";
export const BLUE = "\x1B[34m";
export const GREEN = "\x1B[32m";
export const RESET = "\x1B[0m";

export function jloads(text: string): any {
  return JSON.parse(text);
}

export function jdumps(obj: any): string {
  return JSON.stringify(obj, null, 2) || "";
}

export interface Effect {
  color: string
  scale: number
  skew: [number, number]
}

export interface AnimationState {
  position?: [number, number] // absolute position
  effect?: Effect
}

export interface Animatable {
  position: [number, number]
  effect: Effect
  animationState: AnimationState
}

export interface Animation {
  readonly name: string
  delay: number
  duration: number
  iterationCount: number
  animate: (obj: Animatable, timeline: number) => void
  final: (obj: Animatable) => void
}