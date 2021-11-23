/**

深拷贝，考虑数组和对象，但未解决循环引用

 */

function deepClone(target) {
  if (isObject(target)) {
    const temp = Array.isArray(target) ? [] : {};
    for (const key in target) {
      temp[key] = deepClone(target[key]);
    }
    return temp;
  } else {
    return target;
  }
}

function isObject(target) {
  return typeof target === 'object' && target !== null;
}
