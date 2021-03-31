// 可迭代协议(iterable protocal)允许JS对象定义/自定义其迭代行为，如使用for...of语法时循环哪些值
// 一些内置类型默认是可迭代的，如 String, Array, TypedArray, Map 和 Set, 因为这些类型的原型链对象实现了 @@iterator 方法
// 为了成为可迭代对象，一个对象必须实现 @@iterator 方法，即该对象或其原型链上的对象必须有以 @@iterator 为key的属性，该属性可以通过常量 Symbol.iterator 访问

// Symbol.iterator: used by for...of
// Symbol.asyncIterator: used by for await...of

// USer-defined iterables 1
const myIterable1 = { x: 1, y: 2 };
myIterable1[Symbol.iterator] = function* () {
  // console.log('this :>> ', this);
  // yield 'a';
  // yield 'b';
  // yield 'c';
  const keys = Object.keys(this);
  let idx = 0;
  while (idx < keys.length) {
    yield keys[idx];
    idx += 1;
  }
}

for (const item of myIterable1) {
  console.log('item :>> ', item); // x y
}


// USer-defined iterables 2
const myIterable2 = { a: { id : 'no.1', name: 'A' }, b: { id: 'no.2', name: 'B' } };
myIterable2[Symbol.iterator] = function* () {
  const keys = Object.keys(this);
  let idx = 0;
  while (idx < keys.length) {
    yield this[keys[idx]].id;
    idx += 1;
  }
}

for (const item of myIterable2) {
  console.log('item :>> ', item);
}

