import Stack from '../Stack';

const stack = new Stack();

console.log('stack.isEmpty() :>> ', stack.isEmpty());

stack.push('A');
stack.push('B');
stack.push('C');
stack.push('D');
stack.push('E');

console.log('stack.toString() :>> ', stack.toString());

console.log('stack.peek() :>> ', stack.peek());

stack.pop();

console.log('stack.peek() :>> ', stack.peek());

console.log('stack.toArray() :>> ', stack.toArray());
