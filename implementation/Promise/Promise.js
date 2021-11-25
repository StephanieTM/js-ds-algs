// 构造函数
function Promise(executor) {
  // 2.1 Promise的状态
  // Promise必须处于以下三种状态之一：pending，fulfilled，rejected
  this.state = 'pending';

  // 2.2.6.1 如果Promise处于fulfilled状态，所有相应的onFulfilled回调必须按照它们对应的then的原始调用顺序来执行
  this.onFulfilledCallback = [];

  // 2.2.6.2 如果Promise处于rejected状态，所有相应的onRejected回调必须按照它们对应的then的原始调用顺序来执行
  this.onRejectedCallback = [];

  const self = this;

  function resolve(value) {
    setTimeout(function () {
      // 2.1.1 当Promise处于pending状态时：
      // 2.1.1.1 可以转换到fulfilled或rejected状态

      // 2.1.2 当Promise处于fulfilled状态时：
      // 2.1.2.1 不得过渡到任何其他状态
      // 2.1.2.2 必须有一个不能改变的value
      if (self.state === 'pending') {
        self.state = 'fulfilled';
        self.data = value;
        // 2.2.6.1 如果Promise处于fulfilled状态，所有相应的onFulfilled回调必须按照它们对应的then的原始调用顺序来执行
        for (let i = 0; i < self.onFulfilledCallback.length; i++) {
          self.onFulfilledCallback[i](value);
        }
      }
    });
  }

  function rejected(reason) {
    // 2.1.1 当Promise处于pending状态时：
    // 2.1.1.1 可以转换到fulfilled或rejected状态

    // 2.1.3 当Promise处于rejected状态时：
    // 2.1.3.1 不得过渡到任何其他状态
    // 2.1.3.2 必须有一个不能改变的reason

    setTimeout(function () {
      if (self.state === 'pending') {
        self.state = 'rejected';
        self.data = reason;
        // 2.2.6.2 如果Promise处于rejected状态，所有相应的onRejected回调必须按照它们对应的then的原始调用顺序来执行
        for (let i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason);
        }
      }
    });
  }

  // 用户传入的函数也有可能会执行异常，所以用try...catch包裹
  try {
    executor(resolve, rejected);
  } catch (reason) {
    rejected(reason);
  }
}

// 2.2 then方法
// 一个Promise必须提供then方法用于访问当前/最终值或拒绝原因
// then方法接受两个参数：onFulfilled和onRejected
Promise.prototype.then = function (onFulfilled, onRejected) {
  const self = this;

  let promise2;
  // 2.2.7 then方法必须返回一个Promise
  return (promise2 = new Promise(function (resolve, reject) {
    // 2.2.2 如果onFulfilled是一个函数
    // 2.2.2.1 它必须在Promise状态变为fulfilled之后被调用，并将Promise的值作为它的第一个参数
    // 2.2.2.2 它不能在Promise状态变为fulfilled之前被调用
    // 2.2.2.3 它最多只能被调用一次
    if (self.state === 'fulfilled') {
      // 2.2.4 onFulfilled或onRejected在执行上下文堆栈仅包含平台代码之前不得调用
      // 3.1 这可以通过“宏任务”机制（例如setTimeout或setImmediate）或“微任务”机制（例如MutationObserver或Process.nextTick）实现
      setTimeout(function () {
        // 2.2.1 onFulfilled和onRejected都是可选参数
        // 2.2.1.1 如果onFulfilled不是一个函数，它必须被忽略
        if (typeof onFulfilled === 'function') {
          try {
            // 2.2.2.1 它必须在promise的状态变为fulfilled之后被调用，并将Promise的值作为它的第一个参数
            // 2.2.5 onFulfilled和onRejected必须作为函数调用
            const x = onFulfilled(self.data);
            // 2.2.7.1 如果onFulfilled或onRejected返回了一个值x，则运行Promise处理程序
            promiseResolutionProcedure(promise2, x, resolve, reject);
          } catch (e) {
            // 2.2.7.2 如果onFulfilled或onRejected抛出了一个异常，promise2必须用e作为reason来变为rejected状态
            reject(e);
          }
        } else {
          // 2.2.7.3 如果onFulfilled不是一个函数且promise1为fulfilled状态，promise2必须用和promise1一样的值来变为fulfilled状态
          resolve(self.data);
        }
      });
    }

    // 2.2.3 如果onRejected是一个函数
    // 2.2.3.1 它必须在Promise状态变为rejected之后被调用，并将Promise的原因作为它的第一个参数
    // 2.2.3.2 它不能在Promise状态变为rejected之前被调用
    // 2.2.3.3 它最多只能被调用一次
    else if (self.state === 'rejected') {
      // 2.2.4 onFulfilled或onRejected在执行上下文堆栈仅包含平台代码之前不得调用
      // 3.1 这可以通过“宏任务”机制（例如setTimeout或setImmediate）或“微任务”机制（例如MutationObserver或Process.nextTick）实现
      setTimeout(function () {
        // 2.2.1 onFulfilled和onRejected都是可选参数
        // 2.2.1.2 如果onRejected不是一个函数，它必须被忽略
        if (typeof onRejected === 'function') {
          try {
            // 2.2.3.1 它必须在promise的状态变为rejected之后被调用，并将Promise的reason作为它的第一个参数
            // 2.2.5 onFulfilled和onRejected必须作为函数调用
            const x = onRejected(self.data);
            // 2.2.7.1 如果onFulfilled或onRejected返回了一个值x，则运行Promise处理程序
            promiseResolutionProcedure(promise2, x, resolve, reject);
          } catch (e) {
            // 2.2.7.2 如果onFulfilled或onRejected抛出了一个异常，promise2必须用e作为reason来变为rejected状态
            reject(e);
          }
        } else {
          // 2.2.7.4 如果onRejected不是一个函数且promise1为rejected状态，promise2必须用和promise1一样的reason来变为rejected状态
          reject(self.data);
        }
      });
    }

    else if (self.state === 'pending') {
      // 2.2.6 then可能会被同一个promise多次调用

      // 2.2.6.1 如果promise处于fulfilled状态，所有相应的onFulfilled回调必须按照它们对应的then的原始调用顺序来执行
      self.onFulfilledCallback.push(function (promise1Value) {
        if (typeof onFulfilled === 'function') {
          try {
            // 2.2.2.1 它必须在promise的状态变为fulfilled之后被调用，并将Promise的值作为它的第一个参数
            // 2.2.5 onFulfilled和onRejected必须作为函数调用
            const x = onFulfilled(self.data);
            // 2.2.7.1 如果onFulfilled或onRejected返回了一个值x，则运行Promise处理程序
            promiseResolutionProcedure(promise2, x, resolve, reject);
          } catch (e) {
            // 2.2.7.2 如果onFulfilled或onRejected抛出了一个异常，promise2必须用e作为reason来变为rejected状态
            reject(e);
          }
        } else {
          // 2.2.7.3 如果onFulfilled不是一个函数且promise1为fulfilled状态，promise2必须用和promise1一样的值来变为fulfilled状态
          resolve(promise1Value);
        }
      });

      // 2.2.6.2 如果promise处于rejected状态，所有相应的onRejected回调必须按照它们对应的then的原始调用顺序来执行
      self.onRejectedCallback.push(function (promise1Reason) {
        if (typeof onRejected === 'function') {
          try {
            // 2.2.3.1 它必须在promise的状态变为rejected之后被调用，并将Promise的reason作为它的第一个参数
            // 2.2.5 onFulfilled和onRejected必须作为函数调用
            const x = onRejected(self.data);
            // 2.2.7.1 如果onFulfilled或onRejected返回了一个值x，则运行Promise处理程序
            promiseResolutionProcedure(promise2, x, resolve, reject);
          } catch (e) {
            // 2.2.7.2 如果onFulfilled或onRejected抛出了一个异常，promise2必须用e作为reason来变为rejected状态
            reject(e);
          }
        } else {
          // 2.2.7.4 如果onRejected不是一个函数且promise1为rejected状态，promise2必须用和promise1一样的reason来变为rejected状态
          reject(promise1Reason);
        }
      });
    }
  }));
}

// 2.3 Promise处理程序
// Promise处理程序是一个将promise和value作为输入的抽象操作，我们将其表示为[[Resolve]](promise, x)
// 补充说明：这里我们将resolve和reject也传入，是因为后续要根据不同的逻辑对promise执行fulfill或reject操作
function promiseResolutionProcedure(promise2, x, resolve, reject) {
  // 2.3.1 如果promise和x引用的是同一个对象，promise将以一个TypeError作为reason来执行reject
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise'));
  }

  // 2.3.2 如果x是一个promise，根据它的状态：
  if (x instanceof Promise) {
    // 2.3.2.1 如果x的状态为pending，promise必须保持pending状态直到x的状态变为fulfilled或rejected
    if (x.state === 'pending') {
      x.then(function (value) {
        promiseResolutionProcedure(promise2, value, resolve, reject);
      }, reject);
    }

    // 2.3.2.2 如果x的状态为fulfilled，那么promise也用同样的值来执行fulfill操作
    else if (x.state === 'fulfilled') {
      resolve(x.data);
    }

    // 2.3.2.3 如果x的状态为rejected，那么promise也用同样的reason来执行reject操作
    else if (x.state === 'rejected') {
      reject(x.data);
    }

    return;
  }

  // 2.3.3 如果x是一个对象或者函数
  if (x && (typeof x === 'object' || typeof x === 'function')) {
    // 2.3.3.3.3 如果resolvePromise和rejectPromise都被调用，或者多次调用相同的参数，则第一次调用优先，任何之后的调用都将被忽略
    let isCalled = false;

    try {
      // 2.3.3.1 声明一个then变量来保存then
      let then = x.then;
      // 2.3.3.3 如果then是一个函数，将x作为this来调用它，第一个参数为resolvePromise，第二个参数为rejectPromise，其中：
      if (typeof then === 'function') {
        then.call(
          x,
          // 2.3.3.3.1 假设resolvePromise使用一个名为y的值来调用，运行promise处理程序[[Resolve]](promise, y)
          function resolvePromise(y) {
            // 2.3.3.3.3 如果resolvePromise和rejectPromise都被调用，或者多次调用同样的参数，则第一次调用优先，任何之后的调用都被忽略
            if (isCalled) return;
            isCalled = true;
            return promiseResolutionProcedure(promise2, y, resolve, reject);
          },
          // 2.3.3.3.1 假设rejectPromise使用一个名为r的reason来调用，则用r作为reason对promise执行reject操作
          function rejectPromise(r) {
            // 2.3.3.3.3 如果resolvePromise和rejectPromise都被调用，或者多次调用同样的参数，则第一次调用优先，任何之后的调用都被忽略
            if (isCalled) return;
            isCalled = true;
            return reject(r);
          }
        )
      } else {
        // 2.3.3.4 如果then不是一个函数，使用x作为值对promise执行fulfill操作
        resolve(x);
      }
    } catch (e) {
      // 2.3.3.2 如果检索x.then的结果抛出异常e，使用e作为reason对promise执行reject操作
      // 2.3.3.3.4 如果调用then时抛出一个异常e
      // 2.3.3.3.4.1 如果resolvePromise或者rejectPromise已经被调用过了，则忽略异常
      if (isCalled) return;
      isCalled = true;
      // 2.3.3.3.4.2 否则，使用e作为reason对promise执行reject操作
      reject(e);
    }
  }

  // 2.3.4 如果x不是一个对象或者函数，使用x作为值对promise执行fulfill操作
  else {
    resolve(x);
  }
}

module.exports = Promise;
