function fn(num) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(num * 2);
    }, 1000);
  });
}

function* gen() {
  const num1 = yield fn(1);
  console.log('num1 :>> ', num1);

  const num2 = yield fn(num1);
  console.log('num2 :>> ', num2);

  const num3 = yield fn(num2);
  console.log('num3 :>> ', num3);

  return num3;
}

function generatorToAsync(generatorFn) {
  return function () {
    const gen = generatorFn.apply(this, arguments);

    return new Promise((resolve, reject) => {
      function go(key, arg) {
        let res;
        try {
          res = gen[key](arg);
        } catch (e) {
          return reject(e);
        }

        const { value, done } = res;
        if (done) {
          return resolve(value);
        } else {
          return Promise.resolve(value).then(val => go('next', val), err => go('throw', err));
        }
      }

      go('next');
    });
  };
}

const asyncFn = generatorToAsync(gen); // asyncFn 返回 Promise
asyncFn().then(res => console.log('res :>> ', res));
