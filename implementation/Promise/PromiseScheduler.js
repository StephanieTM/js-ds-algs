/**

实现带并发限制的 Promise 调度器，保证同时运行的任务最多有 n 个

addTask(1000,"1");
addTask(500,"2");
addTask(300,"3");
addTask(400,"4");
的输出顺序是：2 3 1 4

执行流程：

一开始1、2两个任务开始执行
500ms时，2任务执行完毕，输出2，任务3开始执行
800ms时，3任务执行完毕，输出3，任务4开始执行
1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
1200ms时，4任务执行完毕，输出4

 */

class PromiseScheduler {
  constructor(limit) {
    this.queue = [];
    this.limit = limit;
    this.runningCount = 0;
  }

  add(time, order) {
    const promiseCreator = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('order :>> ', order);
          resolve();
        }, time);
      });
    };

    this.queue.push(promiseCreator);
  }

  taskStart() {
    for (let i = 0; i < this.limit; i += 1) {
      this.request();
    }
  }

  request() {
    if (!this.queue.length || this.runningCount >= this.limit) return;

    this.runningCount++;
    this.queue.shift()().then(() => {
      this.runningCount--;
      this.request(); // 让出一空，继续执行之后的任务，只要保证同时不超过 limit 个即可
    });
  }
}

const scheduler = new PromiseScheduler(2);

const addTask = (time, order) => {
  scheduler.add(time, order);
};

addTask(1000, '1');
addTask( 500, '2');
addTask( 300, '3');
addTask( 400, '4');

scheduler.taskStart();
