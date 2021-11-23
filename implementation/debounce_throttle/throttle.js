// http://demo.nimius.net/debounce_throttle/

// 节流：指定时间内最多调用一次
// 即在空闲状态调用时方可响应，先变为非空闲状态，等待指定时间后执行，这期间的调用忽略，执行结束后再变为空闲状态

function throttle(fn, ms) {
  let free = true; // 空闲

  return function () {
    if (!free) return;
    free = false;
    
    const that = this;
    const args = arguments;

    setTimeout(() => {
      fn.apply(that, args);
      free = true;
    }, ms);
  }
}
