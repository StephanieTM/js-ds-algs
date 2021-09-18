// 发布订阅模式

class PubSub {
  constructor() {
    // 存储时间类型和对应的订阅函数数组
    // key <eventType>: value <subscribeList>[]
    this.handlers = {};
  }

  // 订阅事件方法
  on(eventType, handler) {
    if (!(eventType in this.handlers)) {
      this.handlers[eventType] = [];
    }
    this.handlers[eventType].push(handler);
  }

  // 消息发布方法
  emit(eventType, ...handlerArgs) {
    this.handlers[eventType].forEach(v => {
      v(...handlerArgs);
    });
  }

  // 取消订阅
  remove(eventType, handler) {
    if (!handler) {
      // 如果没有指定事件处理函数，则清空
      this.handlers[eventType].length = 0;
    } else {
      const key = this.handlers[eventType].findIndex(v => v === handler);
      if (key !== -1) {
        this.handlers[eventType].splice(key, 1);
      }
    }
  }
}

const test1 = new PubSub();
const fn1 = (...data) => console.log('data :>> ', data);
test1.on('event1', fn1);
test1.on('event1', (...data) => console.log(`fn2: ${data}`));
test1.emit('event1', 'aaa', 'bbb', 'ccc');
test1.remove('event1', fn1);
