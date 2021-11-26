Promise._race = function(arr) {
  return new Promise((resolve, reject) => {
    let flag = false;

    const succes = (data) => {
      if (!flag) {
        flag = true;
        resolve(data);
      }
    };

    const fail = (reason) => {
      if (!flag) {
        flag = true;
        reject(reason);
      }
    };

    arr.forEach(promise => {
      if (promise instanceof Promise) {
        promise.then(res => succes(res))
          .catch(err => fail(err));
      } else {
        succes(promise);
      }
    });
  });
};
