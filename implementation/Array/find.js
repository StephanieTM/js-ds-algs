Array.prototype._find = function (callback) {
  let item = undefined;
  for (let i = 0; i < this.length; i += 1) {
    if (callback(this[i], i, this)) {
      item = this[i];
      break;
    }
  }
  return item;
};
