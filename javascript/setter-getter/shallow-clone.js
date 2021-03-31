// spread运算符不会触发setter，会触发getter
// Object.assign()使用target的setter和source的getter


// ================================================================================================
const target1 = { a: 1, b: 2, set c(val) { this.b = val + 100 }, get e() { return this.b + 300 } };
console.log('target1 :>> ', target1); // { a: 1, b: 2, c: [Setter], e: [Getter] }
const cloned1 = { ...target1, ...{ c: 5, get d() { return this.c + 200 } } };
console.log('cloned1 :>> ', cloned1); // { a: 1, b: 2, c: 5, e: 302, d: 205 }


// ================================================================================================
const target2 = { a: 1, b: 2, set c(val) { this.b = val + 100 }, get e() { return this.b + 300 } };
console.log('target2 :>> ', target2); // { a: 1, b: 2, c: [Setter], e: [Getter] }
const cloned2 = Object.assign(target2, { c: 5, get d() { return this.c + 200 } });
console.log('cloned2 :>> ', cloned2);// { a: 1, b: 105, c: [Setter], e: [Getter], d: 205 }
