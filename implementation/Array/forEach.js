Array.prototype._forEach = function(callback) {
  for (let i = 0; i < this.length; i += 1) {
    callback(this[i], i, this);
  }
};

const a = [
  { name: 'A' },
  { name: 'B' },
  { name: 'C' },
]

a._forEach((item, index, arr) => {
  console.log('item :>> ', item);
  console.log('index :>> ', index);
  console.log('arr :>> ', arr);
});
