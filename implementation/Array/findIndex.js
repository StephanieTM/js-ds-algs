Array.prototype._findIndex = function (callback) {
  let index = -1;
  for (let i = 0; i < this.length; i += 1) {
    if (callback(this[i], i, this)) {
      index = i;
      break;
    }
  }
  return index;
};
