// 根据资源列表创建一个代理, 使之支持map访问和数组访问
export function buildPluginParams(names: string[], resources: unknown[]) {
  const obj = {};
  names.forEach((key, index) => {
    Reflect.set(obj, key, resources[index]);
  });
  return new Proxy(obj, {
    get(target, key, receiver) {
      // 数组式访问
      const kNum = parseInt(key as string);
      if (typeof kNum === "number" && !isNaN(kNum) && kNum < names.length) {
        return Reflect.get(target, names[kNum], receiver);
      }
      return Reflect.get(target, key, receiver);
    },
  });
}
