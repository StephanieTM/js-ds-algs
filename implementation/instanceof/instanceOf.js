// instanceof

// 用于检测构造函数/类的prototype属性是否出现在某个实例对象的原型链上(可以检出继承)

// --------------------------------------------------------

// 使用方式：

// function Animal() {}
// function Plant() {}

// const cat = new Animal();
// const tree = new Plant();

// cat instanceof Animal // true
// cat instanceof Plant // false
// tree instanceof Animal // false
// tree instanceof Plant // true

// --------------------------------------------------------

// 实现思路：

// 判断右操作数的原型是否存在于左操作数的原型链上

// --------------------------------------------------------

function instanceOf(obj, Constructor) {
  let proto = obj.__proto__;
  const prototype = Constructor.prototype;

  while (true) {
    if (proto === null) return false;
    if (proto === prototype) return true;
    proto = proto.__proto__;
  }
}
