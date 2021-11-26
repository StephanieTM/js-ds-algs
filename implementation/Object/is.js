// Object.is(a, b) 用于判断 a 和 b 是否相等；以下情况视为相等
// 都是 undefined
// 都是 null
// 都是 true 或都是 false
// 都是字符串且长度相同且以相同的顺序包含相同的字符
// 都是同一个对象（在内存中引用同一个对象）
// 都是数字（都是 +0 或都是 -0 或都是 NaN 或都是非零非 NaN 的相同数字）

// Object.is 与 == 的区别： == 会进行类型转换
// Object.is 与 === 的区别： === 认为 +0 和 -0 相等，但 NaN 和 NaN 不等

Object._is = function (a, b) {
  if (a === b) {
    return a !== 0 || 1 / a === 1 / b; // +0, -0
  } else {
    return a !== a && b !== b; // NaN
  }
};
