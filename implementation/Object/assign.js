// Object.assign(target, ...sources) 将 sources 的可枚举自有属性并入 target 并返回修改后的 target

Object._assign = function (target, ...sources) {
  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  for (const source of sources) {
    for (const key in source) {
      if (source.hasOwnProperty(key) && source.propertyIsEnumerable(key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
}
