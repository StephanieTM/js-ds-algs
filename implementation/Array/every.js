Array.prototype._every = function (callback) {
  let flag = true;
  for (let i = 0; i < this.length; i += 1) {
    if (!callback(this[i], i, this)) {
      flag = false;
      break;
    }
  }
  return flag;
};
