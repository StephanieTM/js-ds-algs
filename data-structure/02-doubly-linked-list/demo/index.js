import DoublyLinkedList from '../DoublyLinkedList';

const doublyLinkedList = new DoublyLinkedList();
doublyLinkedList.fromArray(['A', 'B', 'C', 'D', 'E']);

console.log('doublyLinkedList.toString() :>> ', doublyLinkedList.toString(), '\n');

doublyLinkedList.reverse();

console.log('doublyLinkedList.toString() :>> ', doublyLinkedList.toString(), '\n');
