// get语法将对象属性绑定到在查找该属性时将调用的函数

// {get prop() { ... } }
// {get [expression]() { ... } }

// get属性名需为number或string
// get函数需要有正好有0个入参
// 同一个对象中被get指定的属性不能有其他get或同名真值属性


// ================================================================================================
// define a getter on new objects in object initializers; remove a getter with delete operator
const obj = {
  log: ['example', 'test'],
  get latest() {
    if (this.log.length === 0) return undefined;
    return this.log[this.log.length - 1];
  },
};

console.log('obj.latest :>> ', obj.latest); // test

console.log('obj :>> ', obj); // { log: [ 'example', 'test' ], latest: [Getter] }

delete obj.latest;
console.log('obj :>> ', obj); // { log: [ 'example', 'test' ] }


// ================================================================================================
// define a getter on existing objects using defineProperty
const o = { a: 0 };

Object.defineProperty(o, 'b', {
  get: function() { return this.a + 1; },
});

console.log('o.b :>> ', o.b); // 1


// ================================================================================================
// use a computed property name
const expr = 'happyjaggy'
const hey = {
  get [expr]() { return 'noisydaisy'; }
};

console.log('hey.happyjaggy :>> ', hey.happyjaggy); // noisydaisy


// ================================================================================================
// smart getters
// getter提供了一种定义属性的方式，在访问此属性之前，计算不会发生，即计算被推迟了
// 某些情况下，我们希望getter变得lazy：
// 1. 某个属性的计算消耗较多的时间或性能
// 2. 属性的值并不是立即被需要，甚至一些场景下根本不会被用到
// 3. 如果属性被使用（多次），但只需计算一次
const lazy = {
  hi: 'hi',
  get notifier() {
    delete this.notifier;
    return this.notifier = 'something really difficult...';
  }
};

console.log('lazy :>> ', lazy); // { hi: 'hi', notifier: [Getter] }
console.log('lazy.notifier :>> ', lazy.notifier);// something really difficult...
console.log('lazy :>> ', lazy); // { hi: 'hi', notifier: 'something really difficult...' }
console.log('lazy.notifier :>> ', lazy.notifier); // something really difficult...


// ================================================================================================
// get vs. defineProperty
// 尽管 get 和 Object.defineProperty() 产生类似的效果，但在class中使用时二者有细微差别
// 使用 get 时属性会被定义在实例的原型上，使用 Object.defineProperty() 时属性会被定义在实例上
class Example {
  get hello() {
    return 'world';
  }
}

const instance = new Example();
console.log('instance.hello :>> ', instance.hello); // world

console.log('Object.getOwnPropertyDescriptor(instance, \'hello\') :>> ', Object.getOwnPropertyDescriptor(instance, 'hello')); // undefined

console.log('Object.getPrototypeOf(instance) :>> ', Object.getPrototypeOf(instance)); // Example {}

console.log('Object.getOwnPropertyDescriptor(Object.getPrototypeOf(instance), \'hello\') :>> ', Object.getOwnPropertyDescriptor(Object.getPrototypeOf(instance), 'hello')); // { get: [Function: get], set: undefined, enumerable: false, configurable: true }
