// 生成器是可以退出然后再重新进入的函数
// function* generator(i) { yield i } // generator是生成器函数(GeneratorFunction)
// const gen = generator(10); // gen是生成器(Generator)

function* generator(x) {
  x++;
  const y = yield x;
  yield y/2;
};

const gen = generator(1);

const step1 = gen.next();
const step2 = gen.next(8);
const step3 = gen.next();

console.log('step1 :>> ', step1); // { value: 2, done: false }
console.log('step2 :>> ', step2); // { value: 4, done: false }
console.log('step3 :>> ', step3); // { value: undefined, done: true }
