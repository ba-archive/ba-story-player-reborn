import { Assets, type LoadAsset } from "pixi.js";

type OnCompleteSignal<T> = (resource: T) => void;

declare interface ILoaderAdd {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  <T = any>(url: string, callback?: OnCompleteSignal<T>): void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
  <T = any>(name: string, url: string, callback?: OnCompleteSignal<T>): void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
  <T = any>(alias: string[], url: string, callback?: OnCompleteSignal<T>): void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
  <T = any>(asset: LoadAsset, callback?: OnCompleteSignal<T>): void;
}

declare interface ILoaderLoad {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  <T = any>(asset: LoadAsset): Promise<LoadedResource<T>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LoadedResource<T = any> = {
  name: string;
  src: string;
  alias?: string[];
  resource: T
}

type ResourceManager = {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  add: ILoaderAdd;
  load: ILoaderLoad;
  loadAll: (cb?: () => void) => void;
  onLoad?: OnCompleteSignal<LoadedResource>;
  onError?: OnCompleteSignal<LoadedResource & { cause: Error }>;
  onComplete?: OnCompleteSignal<Record<string, LoadedResource>>;
  setLoadedAsset(asset: LoadAsset): void;
}

type ResourceLoadItem = {
  param: LoadAsset;
  onComplete?: OnCompleteSignal<never>;
  loaded: boolean;
}

export function initResourceManager(basePath: string): ResourceManager {
  Assets.init({
    basePath,
  }).then();
  if (!window.resourceMap) {
    window.resourceMap = new Map();
  }
  const resourceMap = window.resourceMap;
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    add: <T = any>(keysIn: string | string[] | LoadAsset, assetsIn?: string | OnCompleteSignal<T>, callback?: OnCompleteSignal<T>) => {
      const target: ResourceLoadItem = {
        param: {
          name: "",
          src: "",
        },
        loaded: false,
      };
      if (typeof keysIn === "string") {
        if (typeof assetsIn === "string") {
          // (name: string, url: string, callback?: OnCompleteSignal<T>)
          target.param = {
            name: keysIn,
            src: assetsIn,
            alias: [keysIn],
          };
          target.onComplete = callback;
        } else {
          // (url: string, callback?: OnCompleteSignal<T>)
          target.param = {
            name: keysIn,
            src: keysIn,
            alias: [keysIn],
          };
          target.onComplete = assetsIn;
        }
      } else if (Array.isArray(keysIn)) {
        // (alias: string[], url: string, callback?: OnCompleteSignal<T>)
        target.param = {
          name: keysIn[0],
          src: assetsIn as string,
          alias: keysIn,
        };
        target.onComplete = callback;
      } else {
        // (asset: LoadAsset, callback?: OnCompleteSignal<T>)
        target.param = keysIn;
        target.onComplete = callback;
      }
      // distinct 合并url相同的资源
      const maybeDuplicate = [...resourceMap.values()].find((it) => it.param.src === target.param.src);
      if (maybeDuplicate) {
        maybeDuplicate.param.alias?.push(...(target.param.alias || []));
        target.param.alias?.forEach((key) => {
          resourceMap.set(key, maybeDuplicate);
        });
        Assets.load(maybeDuplicate.param);
      } else {
        resourceMap.set(target.param.name, target);
        if (target.param.alias) {
          target.param.alias.forEach((key) => {
            resourceMap.set(key, target);
          });
        }
      }
    },
    load<T>(asset: LoadAsset) {
      // 加到本地map中
      this.add(asset);
      return Assets.load<T>(asset).then((resource) => {
        this.setLoadedAsset(asset);
        return {
          name: asset.name,
          src: asset.src,
          alias: asset.alias,
          resource: resource,
        };
      });
    },
    loadAll(cb?: () => void) {
      const valueMap = [...resourceMap.values()];
      const urls = valueMap.map((it) => it.param.src);
      const distinct = urls.filter((it, index) => urls.indexOf(it) === index);
      const resources = valueMap.filter((it) => {
        const url = it.param.src;
        const urlIndex = distinct.indexOf(url);
        if (urlIndex) {
          distinct.splice(urlIndex, 1);
          return true;
        }
        return false;
      });
      Promise.allSettled(resources.map((re) => Assets.load(re.param).then((resource) => {
        this.setLoadedAsset(re.param);
        re.onComplete && re.onComplete(resource as never);
      }))).then(cb);
    },
    setLoadedAsset(_asset: LoadAsset) {
      const asset = resourceMap.get(_asset.name);
      if (asset) {
        asset.loaded = true;
      }
    },
  };
}
