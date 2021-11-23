/**

深拷贝，考虑数组和对象，解决循环引用

 */

function deepClone(target, map = new Map()) {
  if (isObject(target)) {
    const temp = Array.isArray(target) ? [] : {};

    if (map.has(target)) {
      // 已存在，直接返回上次的拷贝
      return map.get(target);
    }
    // 不存在，首次设置，将拷贝缓存下来
    map.set(target, temp);

    for (const key in target) {
      temp[key] = deepClone(target[key], map);
    }
    return temp;
  } else {
    return target;
  }
}

function isObject(target) {
  return typeof target === 'object' && target !== null;
}
