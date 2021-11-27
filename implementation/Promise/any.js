Promise._any = function (arr) {
  return new Promise((resolve, reject) => {
    let count = 0;

    const handleSettle = (status, data) => {
      if (status === 'fulfilled') resolve(data);
      if (status === 'rejected') count++;
      if (count === arr.length) {
        reject(new AggregateError('All promises were rejected'));
      }
    };

    arr.forEach(promise => {
      if (promise instanceof Promise) {
        promise.then(data => handleSettle('fulfilled', data))
          .catch(reason => handleSettle('rejected', reason));
      } else {
        handleSettle('fulfilled', promise);
      }
    });
  });
};
