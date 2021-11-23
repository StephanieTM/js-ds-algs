/**

实现一个LazyMan，可以按照以下方式调用:
LazyMan("Hank")输出:
Hi! This is Hank!

LazyMan("Hank").sleep(10).eat("dinner")输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

LazyMan("Hank").eat("dinner").eat("supper")输出
Hi This is Hank!
Eat dinner~
Eat supper~

LazyMan("Hank").eat("supper").sleepFirst(5)输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper

 */

class LazyMan {
  constructor(name) {
    this.tasks = [];

    const initialTask = () => {
      console.log(`Hi! This is ${name}`);
      this.next();
    };

    this.tasks.push(initialTask);

    setTimeout(() => this.next(), 0); // 由于可能存在 sleepFirst 这种会打乱顺序的任务，故创建宏任务来调度任务队列，而不是同步执行首个任务
  }

  next() {
    const task = this.tasks.shift(); // 从任务队列头部取出一个任务来执行
    task && task();
  }

  sleep(time) {
    this.sleepWrapper(time, false);
    return this; // 返回 this 以支持链式调用
  }

  sleepFirst(time) {
    this.sleepWrapper(time, true);
    return this; // 返回 this 以支持链式调用
  }

  sleepWrapper(time, first) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`)
        this.next();
      }, time * 1000);
    };

    if (first) {
      this.tasks.unshift(task);
    } else {
      this.tasks.push(task);
    }
  }

  eat(meal) {
    const task = () => {
      console.log(`Eat ${meal}~`);
      this.next();
    };

    this.tasks.push(task);

    return this; // 返回 this 以支持链式调用
  }
}

const lazyMan = (name) => new LazyMan(name);

lazyMan('Hank').sleep(1).eat('dinner');
lazyMan('Mary').eat('lunch').eat('supper');
lazyMan('Walter').eat('brunch').sleepFirst(6);
