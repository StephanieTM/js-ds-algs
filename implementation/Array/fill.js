Array.prototype._fill = function (value, start = 0, end) {
  end = end || this.length;
  for (let i = start; i < end; i += 1) {
    this[i] = value;
  }
  return this;
};
