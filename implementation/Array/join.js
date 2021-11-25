Array.prototype._join = function (str = ',') {
  let result = '';
  for (let i = 0; i < this.length; i += 1) {
    result = i === 0 ? `${result}${this[i]}` : `${result}${str}${this[i]}`;
  }
  return result;
};
