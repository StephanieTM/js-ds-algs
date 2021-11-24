Array.prototype._includes = function (value, start = 0) {
  if (start < 0) {
    start = this.length + start;
  }
  const isNaN = Number.isNaN(value);
  for (let i = start; i < this.length; i += 1) {
    if (this[i] === value || (isNaN && Number.isNaN(this[i]))) {
      return true;
    } 
  }
  return false;
};
