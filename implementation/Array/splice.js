Array.prototype._splice = function (start, deleteCount, ...values) {
  const deletedElements = []; // 存放被删除的元素，用作返回值
  const length = this.length; // 修改前的数组长度
  start = start < 0 ? Math.max(length + start, 0) : Math.min(start, length); // start为负数时视为倒数第n个元素；start为负数且绝对值大于数组长度时视为0
  deleteCount = Math.max(0, Math.min(deleteCount, length - start)); // 删除的元素个数为负数时视为0；删除的元素个数大于可删除元素个数时视为可删除元素个数
  const newLength = length - deleteCount + values.length;
  console.log('newLength :>> ', newLength);

  if (values.length <= deleteCount) { // 添加的元素不多于删除的元素，即数组长度不变或变小
    for (let i = start; i < length; i += 1) {
      if (i < start + deleteCount) {
        deletedElements.push(this[i]); // 缓存待删除元素
      }
      if (i < start + values.length) {
        this[i] = values[i - start]; // 增加元素
      } else {
        this[i] = this[i + deleteCount - values.length]; // 删除元素
      }
    }
    this.length = newLength; // 裁剪
  } else { // 添加的元素多于删除的元素，即数组长度变大
    for (let i = newLength - 1; i >= start; i -= 1) {
      if (newLength - i <= deleteCount) {
        deletedElements[deleteCount - (newLength - i)] = this[start + deleteCount - (newLength - i)]; // 缓存待删除元素
      }
      if (i >= start + values.length && i < newLength) {
        this[i] = this[length - (newLength - i)]; // 删除元素
      }
      if (i < start + values.length) {
        this[i] = values[i - start]; // 增加元素
      }
    }
    this.length = newLength; // 裁剪
  }

  return deletedElements;
};

const a = [1,2,3,4,5]

console.log('before :>> ', a);
const start = -100, deleteCount = -1, values = ['s'];
console.log(`start: ${start}, deleteCount: ${deleteCount}, values: [${values}]`);
const deleted = a._splice(start, deleteCount, ...values);
console.log('deleted :>> ', deleted);
console.log('after :>> ', a);
