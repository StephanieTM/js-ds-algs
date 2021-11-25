Array.prototype._filter = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i += 1) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};
