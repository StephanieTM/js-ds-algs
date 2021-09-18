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
