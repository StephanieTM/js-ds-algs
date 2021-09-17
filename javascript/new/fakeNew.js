/*
new:
1. 创建对象
2. 继承原型
3. 改变this指向
4. 对象构造
5. 返回结果
*/

function fakeNew() {
  // 创建对象
  const obj = Object.create(null);
  const Constructor = [].shift.call(arguments); // 取第一个参数作为构造函数，将其从arguments头部移除

  // 继承原型：将对象的__proto__赋值为构造函数的prototype属性
  obj.__proto__ = Constructor.prototype;

  // 将构造函数内部的this赋值为新对象，执行构造函数
  const ret = Constructor.apply(obj, arguments);

  // 如果构造函数返回非null对象，则返回该值，否则返回对象本身（this）
  return (typeof ret === 'object' && ret !== null) ? ret : obj;
}

function Member(name, age) {
  this.name = name;
  this.age = age;
}

const member = fakeNew(Member, 'Amber', 20);
