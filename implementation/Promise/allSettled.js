Promise._allSettled = function (arr) {
  return new Promise((resolve, reject) => {
    const result = [];
    let count = 0;

    const addData = (status, data, index) => {
      count++;
      result[index] = {
        status,
        [status === 'rejected' ? 'reason' : 'value']: data,
      };
      if (count === arr.length) {
        resolve(result);
      }
    };

    arr.forEach((promise, index) => {
      if (promise instanceof Promise) {
        promise.then(data => addData('fulfilled', data, index))
          .catch(reason => addData('rejected', reason, index));
      } else {
        addData('fulfilled', promise, index);
      }
    });
  });
};
