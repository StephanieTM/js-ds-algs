// https://www.promisejs.org/implementing/

const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

function PromiseFn(fn) {
  let state = PENDING;
  let value = null;
  const handlers = [];

  function fulfill(result) {
    state = FULFILLED;
    value = result;
    handlers.forEach(handle);
    handlers = null;
  }

  function reject(error) {
    state = REJECTED;
    value = error;
    handlers.forEach(handle);
    handlers = null;
  }

  function resolve(result) {
    try {
      const then = getThen(result);
      if (then) {
        doResolve(then.bind(result), resolve, reject);
        return;
      }
      fulfill(result);
    } catch (e) {
      reject(e);
    }
  }

  function handle(handler) {
    if (state === PENDING) {
      handlers.push(handler);
    } else {
      if (state === FULFILLED && typeof handler.onFulfilled === 'function') {
        handler.onFulfilled(value);
      }
      if (state === REJECTED && typeof handler.onRejected === 'function') {
        handler.onRejected(value);
      }
    }
  }

  this.done = function (onFulfilled, onRejected) {
    setTimeout(function () {
      handle({
        onFulfilled,
        onRejected,
      })
    }, 0);
  };

  this.then = function (onFulfilled, onRejected) {
    const self = this;
    return new PromiseFn(function (resolve, reject) {
      return self.done(function (result) {
        if (typeof onFulfilled === 'function') {
          try {
            return resolve(onFulfilled(result));
          } catch (e) {
            return reject(e);
          }
        } else {
          return resolve(result);
        }
      }, function (error) {
        if (typeof onRejected === 'function') {
          try {
            return resolve(onRejected(error));
          } catch (e) {
            return reject(e);
          }
        } else {
          return reject(error);
        }
      });
    });
  };

  doResolve(fn, resolve, reject);
}

function getThen(value) {
  const t = typeof value;
  if (value && (t === 'object' || t === 'function')) {
    const then = value.then;
    if (typeof then === 'function') {
      return then;
    }
  }
  return null;
}

function doResolve(fn, onFulfilled, onRejected) {
  let done = false;
  try {
    fn(function (value) {
      if (done) return;
      done = true;
      onFulfilled(value);
    }, function (reason) {
      if (done) return;
      done = true;
      onRejected(reason);
    })
  } catch (e) {
    if (done) return;
    done = true;
    onRejected(e);
  }
}
