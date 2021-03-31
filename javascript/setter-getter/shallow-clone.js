// Object.assign()使用target的setter和source的getter
// spread运算符不会触发setter

const target1 = { a: 1, b: 2, set c(val) { this.b = val + 100 } };
console.log('target1 :>> ', target1); // { a: 1, b: 2, c: [Setter] }
const cloned1 = { ...target1, ...{ c: 5 } };
console.log('cloned1 :>> ', cloned1); // { a: 1, b: 2, c: 5 }


const target2 = { a: 1, b: 2, set c(val) { this.b = val + 100 } };
console.log('target2 :>> ', target2); // { a: 1, b: 2, c: [Setter] }
const cloned2 = Object.assign(target2, { c: 5 });
console.log('cloned2 :>> ', cloned2);// { a: 1, b: 105, c: [Setter] }
