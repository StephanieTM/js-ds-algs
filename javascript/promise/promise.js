// 状态机:
// pending: 初始状态，未完成也未驳回
// fulfilled: 成功
// rejected: 失败

// Promise是一个用来表示异步操作最终完成或失败的对象


// Promise.prototype.then()接收两个参数：resolve和reject的回调方法，返回一个新的Promise


function promise1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('hello 1!');
    }, 300);
  });
}

function promise2(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data + '\n hi 2!');
    }, 300);
  });
}

function promise3(data) {
  return new Promise((resolve, reject) => {
    reject('reject!');
  });
}

promise1().then(data1 => {
  console.log('data1 :>> \n======strat======\n', data1, '\n======end======\n'); // hello 1!
  return data1;
}).then(data1 => {
  return promise2(data1);
}).then(data2 => {
  console.log('data2 :>> \n======strat======\n', data2, '\n======end======\n'); // hello 1!\n hi 2!
  return promise3(data2);
}).then(data3 => {
  console.log('data3 :>> \n======strat======\n', data3, '\n======end======\n');
}).catch(err => {
  console.log('err :>> ', err); // reject!
});
