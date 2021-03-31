// 尝试设置对象属性时，set语法会将对象属性绑定到要调用的函数

// {set prop(val) { . . . }}
// {set [expression](val) { . . . }}

// set属性名需为number或string
// set函数需要有正好一个入参
// 同一个对象中被set指定的属性不能有其他set或同名真值属性


// define a setter on new objects in initializers; remove a setter with delete operator
const language = {
  set current(name) {
    this.log.push(name);
  },
  log: [],
};

language.current = 'EN';
console.log('language.log :>> ', language.log); // [ 'EN' ]

language.current = 'ZH';
console.log('language.log :>> ', language.log); // [ 'EN', 'ZH' ]

console.log('language :>> ', language); // { current: [Setter], log: [ 'EN', 'ZH' ] }

delete language.current;
console.log('language :>> ', language); // { log: [ 'EN', 'ZH' ] }


// define a setter on existing objects using defineProperty
const o = { a: 0 };

Object.defineProperty(o, 'b', {
  set: function(x) { this.a = x / 2 },
});

o.b = 10;

console.log('o.a :>> ', o.a); // 5


// use a computed property name
const a = 1, b = 2;
const expr = `${a}:${b}:${a+b}`;

const obj = {
  anything: 'anything',
  set [expr](val) { this.anything = val; },
};

console.log('obj.anything :>> ', obj.anything); // anything
obj['1:2:3'] = 'hoho';
console.log('obj.anything :>> ', obj.anything); // hoho
