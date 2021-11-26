Function.prototype._bind = function(thisObj, ...args1) {
  thisObj = thisObj || window;

  const fn = Symbol(); // 使用 Symbol 防止 key 冲突
  thisObj[fn] = this;

  const _this = this;

  const result = function (...args2) {
    const args = [...args1, ...args2];

    if (this instanceof result) { // 判断是否是构造函数
      this[fn] = _this;
      this[fn](...args);
      delete this[fn];
    } else {
      thisObj[fn](...args);
      delete thisObj[fn];
    }
  };

  result.prototype = this.prototype;
  return result;
};
