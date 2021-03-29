import LinkedListNode from './LinkedListNode';
import Comparator from '../../utils/Comparator';

export default class LinkedList {
  constructor(compareFn) {
    this.head = null;
    this.tail = null;

    this.compare = new Comparator(compareFn);
  }

  prepend(value) {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value) {
    const newNode = new LinkedListNode(value, null);

    if (!this.tail || !this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  /**
   * delete given value and return deleted node if existed
   * @param {*} value value to delete
   * @returns last deleted node
   */
  delete(value) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;

    // 如果头部有连续n(n >= 1)个元素需要删除，则新的临时head为首个不需要删除的元素
    while (this.head && this.compare.equal(value, this.head.value)) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    // 初始的currrentNode不需要删除
    let currentNode = this.head;

    // 遍历非头非尾元素
    if (currentNode !== null) {
      while (currentNode.next) {
        // 如果currentNode的下一个元素需要删除，则删除，即currentNode新的下一个元素变成其下下个元素
        // 否则currentNode变成其下一个元素
        if (this.compare.equal(value, currentNode.next.value)) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    // 判断尾元素是否需要删除
    if (this.compare.equal(value, this.tail.value)) {
      this.tail = currentNode;
    }

    return deletedNode;
  }

  find({ value = undefined, callback = undefined }) {}

  deleteTail() {}

  deleteHead() {}

  fromArray(values) {}

  toArray() {}

  toString(callback) {}

  reverse() {}

}
