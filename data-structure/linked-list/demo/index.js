import LinkedList from '../LinkedList';

const linkedList = new LinkedList();
linkedList.fromArray(['A', 'B', 'C', 'D', 'E']);

console.log('linkedList.toString() :>> ', linkedList.toString(), '\n');

linkedList.reverse();

console.log('linkedList.toString() :>> ', linkedList.toString(), '\n');

