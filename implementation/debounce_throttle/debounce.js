// http://demo.nimius.net/debounce_throttle/

// 防抖：最近一次调用后指定时间内没有再调用，则执行

function debounce(fn, ms) {
  let timeout = null;

  return function () {
    if (timeout) {
      clearTimeout(timeout);
    }

    const that = this;
    const args = arguments;

    timeout = setTimeout(() => {
      fn.apply(that, args);
    }, ms);
  }
}
