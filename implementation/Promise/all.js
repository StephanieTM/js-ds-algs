Promise._all = function(arr) {
  return new Promise((resolve, reject) => {
    const result = [];
    let count = 0;

    const addData = (data, index) => {
      result[index] = data;
      count += 1;
      if (count === arr.length) {
        resolve(result);
      }
    };

    arr.forEach((promise, index) => {
      if (promise instanceof Promise) {
        promise.then(res => addData(res, index))
          .catch(err => reject(err));
      } else {
        addData(promise, index);
      }
    });
  });
};
