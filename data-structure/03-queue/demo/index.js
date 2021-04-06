import Queue from '../Queue';

const queue = new Queue();

console.log('queue.isEmpty() :>> ', queue.isEmpty());

queue.linkedList.fromArray(['A', 'B', 'C', 'D', 'E']);

console.log('queue.toString() :>> ', queue.toString());

queue.dequeue();

console.log('queue.toString() :>> ', queue.toString());

queue.enqueue('F');

console.log('queue.toString() :>> ', queue.toString());

console.log('queue.peek() :>> ', queue.peek());

console.log('queue.isEmpty() :>> ', queue.isEmpty());
