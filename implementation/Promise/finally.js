Promise.prototype._finally = function (callback) {
  return this.then(res => {
    callback();
    return res;
  }).catch(err => {
    callback();
    throw err;
  });
};
