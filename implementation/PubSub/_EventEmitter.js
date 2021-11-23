class _EventEmitter {
  constructor() {
    this.cache = {};
  }

  on(name, fn) {
    const tasks = this.cache[name];
    if (tasks) {
      this.cache[name].push(fn);
    } else {
      this.cache[name] = [fn];
    }
  }

  off(name, fn) {
    const tasks = this.cache[name];
    if (tasks) {
      const index = tasks.findIndex(item => item === fn);
      if (index > -1) { // splice 对下标 -1 有特殊处理，故筛除
        this.cache[name].splice(index, 1);
      }
    }
  }

  emit(name, once = false, ...args) {
    const tasks = this.cache[name].slice(); // 拷贝一份，防止回调函数中继续 on 导致死循环
    if (tasks) {
      tasks.forEach(fn => {
        fn(...args);
      });
    }
    if (once) {
      delete this.cache[name];
    }
  }

  once(name, ...args) {
    this.emit(name, true, ...args);
  }
}
