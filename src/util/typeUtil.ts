
/**
 * 创建一个类型保护，强制将object断言为类型 T
 * @param object 将判断的对象
 * @param condition 判断对象是否为T类型的表达式
 * @returns 将object断言为类型T
 */
export function is<T>(object: unknown, condition: boolean): object is T {
  return condition;
}
