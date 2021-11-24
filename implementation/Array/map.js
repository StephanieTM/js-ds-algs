Array.prototype._map = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i += 1) {
    result.push(callback(this[i], i, this));
  }
  return result;
};
