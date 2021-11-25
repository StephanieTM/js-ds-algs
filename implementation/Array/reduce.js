Array.prototype._reduce = function (callback, initiaValue) {
  let start = 0;
  let accumulateValue = initiaValue;
  if (initiaValue === undefined || initiaValue === null) {
    start = 1;
    accumulateValue = this[0];
  }
  for (let i = start; i < this.length; i += 1) {
    accumulateValue = callback(accumulateValue, this[i], i, this);
  }
  return accumulateValue;
};

[].reduce((previousValue, currentValue, currentOndex, array))
