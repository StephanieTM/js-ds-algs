// Promise.race(): 返回一个promise，此promise将
//   resolve/reject: 当有任意一个Promise resolve/reject之后，resolve/reject第一个成功/失败的promise
// [] 空列表，永远pending
// [123, 'string'] 非promise，立即resolve
// [Promise.resolve(123)] 已经settled的promise，立即resolve
// 当race的给定Promise列表中存在已经处于settled状态的promise，则race会resolve第一个此类promise

// (new feature)
// Promise.any(): 返回一个promise，此promise将
//   resolve: 当有任意一个Promise resolve之后，resolve第一个成功的promise
//   reject: 当所有给定的Promise都reject之后，reject并抛出一个AggregateError
// Promise.any() 与 Promise.all() 恰好相反

// 不论all还是allSettled，所有给定的Promise都会被执行至settled，只不过两个API resolve或reject的结果不同

function race() {
  const foreverPendingPromise = Promise.race([]);
  const alreadyResolvedPromise = Promise.resolve(100);
  const alreadyRejectedPromise = Promise.reject(200);

  const arr1 = [foreverPendingPromise, alreadyResolvedPromise, 'non-Promise value'];
  const arr2 = [foreverPendingPromise, 'non-Promise value', alreadyResolvedPromise];
  const arr3 = [foreverPendingPromise, alreadyRejectedPromise, 'non-Promise value'];
  const arr4 = [];
  const arr5 = [foreverPendingPromise];

  const p1 = Promise.race(arr1);
  const p2 = Promise.race(arr2);
  const p3 = Promise.race(arr3);
  const p4 = Promise.race(arr4);
  const p5 = Promise.race(arr5);

  console.log('p1 :>> ', p1); // Promise { <pending> }
  console.log('p2 :>> ', p2); // Promise { <pending> }
  console.log('p3 :>> ', p3); // Promise { <pending> }
  console.log('p4 :>> ', p4); // Promise { <pending> }
  console.log('p5 :>> ', p5); // Promise { <pending> }

  setTimeout(() => {
    console.log('the stack is now empty'); // the stack is now empty
    console.log('p1 after tick :>> ', p1); // Promise { 100 }
    console.log('p2 after tick :>> ', p2); // Promise { 'non-Promise value' }
    console.log('p3 after tick :>> ', p3); // Promise { <rejected> 200 }
    console.log('p4 after tick :>> ', p4); // Promise { <pending> }
    console.log('p5 after tick :>> ', p5); // Promise { <pending> }
  })
}

race();

function any() {
  const pErr = new Promise((resolve, reject) => {
    reject('Always fails');
  });

  const pSlow = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, 'Done eventually');
  });

  const pFast = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'Done quick');
  });

  Promise.any([pErr, pSlow, pFast]).then((value) => {
    console.log('value :>> ', value); // Done quick
  });

  Promise.any([pErr, Promise.reject('fails again')]).then((value) => {
    console.log('value :>> ', value);
  }).catch((error) => {
    console.log('error :>> ', error); // AggregateError: No one promise resolved
  });
}

any();
