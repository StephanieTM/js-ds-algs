String.prototype._substring = function (start = 0, end) {
  if (start < 0) start = 0;
  if (start > this.length) start = this.length;
  if (end < 0) end = 0;
  if (end > this.length) end = this.length;
  if (end === undefined) end = this.length;
  if (start > end) [end, start] = [start, end];

  const result = [];
  for (let i = start; i < end; i += 1) {
    result.push(this[i]);
  }
  return result.join('');
};
