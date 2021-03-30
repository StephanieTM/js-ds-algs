function* func1() {
  yield 'yield in func1';
}

function* func2() {
  yield* func1();
}

const iterator = func2();

const step1 = iterator.next().value;

console.log('step1 :>> ', step1); // yield in func1
