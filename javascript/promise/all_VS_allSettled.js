// Promise.all(): 返回一个promise，此promise将
//   resolve: 当所有给定的Promise都resolve之后，resolve以Promise给定顺序排列的结果
//   reject: 当有任意一个Promise reject之后，reject第一个失败的promise
// 使用场景:
//   几个Promise相互依赖; 如果其中一个Promise失败就需要判定为失败

// (new feature)
// Promise.allSettled(): 返回一个promise，此promise将
//   resolve: 当所有给定的Promise都resolve或reject之后，resolve以Promise给定顺序排列的结果
// 使用场景:
//   几个Promise相互独立; 总是需要知道每个Promise的结果状态

// 不论all还是allSettled，所有给定的Promise都会被执行至settled，只不过两个API resolve或reject的结果不同

function all_VS_allSettled() {
  const promise1 = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve('1');
    }, 20);
  });

  const promise2 = () => new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('2');
    }, 50);
  });

  const promise3 = () => new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('3');
    }, 30);
  });

  const promise4 = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve('4');
    }, 30);
  });

  Promise.all([
    promise1(),
    promise4(),
  ]).then((val) => {
    console.log('val :>> ', val);
  }).catch((err) => {
    console.log('err :>> ', err);
  });

  Promise.all([
    promise1(),
    promise2(),
    promise3(),
  ]).then((val) => {
    console.log('val :>> ', val); // [ '1', '4' ]
  }).catch((err) => {
    console.log('err :>> ', err); // 3
  });

  Promise.allSettled([
    promise1(),
    promise2(),
    promise3(),
  ]).then(result => {
    console.log('result :>> ', result); // [{ status: 'fulfilled', value: '1' }, { status: 'rejected', reason: '2' }, { status: 'rejected', reason: '3' }]
  });
}

all_VS_allSettled();

