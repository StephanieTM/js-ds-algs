Array.prototype._some = function (callback) {
  let flag = false;
  for (let i = 0; i < this.length; i += 1) {
    if (callback(this[i], i, this)) {
      flag = true;
      break;
    }
  }
  return flag;
};
