Function.prototype._apply = function(thisObj, args) {
  thisObj = thisObj || window;

  const fn = Symbol(); // 使用 Symbol 防止 key 冲突
  thisObj[fn] = this;

  return thisObj[fn](...args);
};