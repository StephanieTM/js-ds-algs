// 1 普通递归
function fibonacci1(n) {
  if (n === 1 || n === 2) {
    return 1;
  }
  return fibonacci1(n - 2) + fibonacci1(n - 1);
}

// 2 递归改进，前两位作为参数
function fibonacci2(n) {
  function fib(n, v1, v2) {
    if (n === 1) return v1;
    if (n === 2) return v2;
    else return fib(n - 1, v2, v1 + v2);
  }
  return fib(n, 1, 1);
}

// 3 递归改进，利用闭包✅
const fibonacci3 = (function() {
  const memo = [0, 1];
  const fib = function (n) {
    if (memo[n] === undefined) {
      memo[n] = fib(n - 2) + fib(n - 1);
    }
    return memo[n];
  };
  return fib;
})();

// 3.1 缓存函数封装
const memoizer301 = function (func) {
  const memo = [];
  return function (n) {
    if (memo[n] === undefined) {
      memo[n] = func(n);
    }
    return memo[n];
  };
};

const fibonacci301 = memoizer301(function (n) {
  if (n === 1 || n === 2) {
    return 1;
  }
  return fibonacci301(n - 2) + fibonacci301(n - 1);
});

// 4 for循环
function fibonacci4(n) {
  let n1 = 1, n2 = 1, sum;
  for (let i = 2; i < n; i += 1) {
    sum = n1 + n2;
    n1 = n2;
    n2 = sum;
  }
  return sum;
}
