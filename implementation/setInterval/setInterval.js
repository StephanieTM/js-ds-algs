// 原生 setInterval 存在的问题：
// 如果回调执行时间大于间隔时间，可能会被跳过
// 可以使用 setTimeout 实现改良版的 setInterval ，实现匀速调用

function setIntervalPro(fn, ms) {
  let timeout = null;
  const interval = () => {
    fn();
    timer = setTimeout(interval, ms);
  };
  setTimeout(interval, ms);

  return {
    cancel: () => {
      clearTimeout(timeout);
    },
  };
}

const { cancel } = setIntervalPro(() => console.log('test'), 1000);

setTimeout(() => {
  cancel();
}, 4000)
