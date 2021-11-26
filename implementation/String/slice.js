String.prototype._slice = function (start = 0, end) {
  // start 和 end 都是下标，都是可选，都可以是负数
  start = start < 0 ? this.length + start : start;
  end = end === undefined ? this.length : (end < 0 ? this.length + end : end);

  const result = [];
  for (let i = 0; i < this.length; i += 1) {
    if (i >= start && i < end)
    result.push(this[i]);
  }
  return result.join('');
};
