Array.prototype._flat = function (layer = 1) {
  let arr = [...this];
  while (layer > 0 && arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
    layer -= 1;
  }
  return arr;
};
