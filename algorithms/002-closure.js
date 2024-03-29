// 1 作为函数返回值
function demo() {
  let a = 100;
  return function() {
    console.log(a);
  }
}

let a = 200;
demo()(); // 100

// 2 作为参数
function fn1(fn) {
  const b = 100;
  fn();
}

const b = 200;

function fn() {
  console.log(b);
}

fn1(fn); // 200

// 3 简单应用
function createCache() {
  const data = {};

  return {
    set: function (key, val) {
      data[key] = val;
    },
    get: function (key) {
      return data[key];
    },
  };
}

// 4 简单应用
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  }
}

const counter1 = makeCounter();
console.log(counter1()); // 0
console.log(counter1()); // 1
console.log(counter1()); // 2

const counter2 = makeCounter();
console.log(counter2()); // 0
console.log(counter2()); // 1

// 5 编写一个像 sum(a)(b) = a+b 这样工作的 sum 函数。
function sum(a) {
  return function (b) {
    return a + b;
  }
}

// 6 未初始化
let x = 1;

function func() {
  // 在 let x = 2; 之前是x的死区
  console.log(x); // ReferenceError: Cannot access 'x' before initialization

  let x = 2;
}

func();
