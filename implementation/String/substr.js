String.prototype._substr = function (from = 0, length) {
  from = from < 0 ? Math.max(0, this.length + from) : from;
  length = length === undefined ? this.length : Math.max(0, length);

  const result = [];
  for (let i = 0; i < this.length; i += 1) {
    if (i >= from && i < from + length) {
      result.push(this[i]);
    }
  }
  return result.join('');
};
