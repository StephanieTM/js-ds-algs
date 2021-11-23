/**

编写柯里化函数 currying 实现以下效果

const add = (a, b, c) => a + b + c;
const a = currying(add, 1);
console.log(a(2,3)) // 1 + 2 + 3 = 6

 */

function currying(fn, ...args1) {
  const length = fn.length; // 参数列表长度
  let allArgs = [...args1];

  const result = (...args2) => {
    allArgs = [...allArgs, ...args2];
    if (allArgs.length === length) {
      return fn(...allArgs);
    } else {
      return result;
    }
  };

  return result;
}

const add = (a, b, c) => a + b + c;
const a = currying(add, 1);
console.log(a(2, 3));
