import LinkedList from '../01-linked-list/LinkedList';

export default class Queue {
  constructor() {
    // 此处使用链表来实现队列
    this.linkedList = new LinkedList();
  }

  isEmpty() {
    return !this.linkedList.head;
  }

  /**
   * 读取队列头部的数据并返回，但不做任何写操作（删除等）
   */
  peek() {
    if (!this.linkedList.head) {
      return null;
    }

    return this.linkedList.head.value;
  }


  /**
   * 入队：在队列末尾追加元素
   */
  enqueue(value) {
    this.linkedList.append(value);
  }

  /**
   * 出队：从队列头部删除元素
   */
  dequeue() {
    const removedHead = this.linkedList.deleteHead();
    return removedHead ? removedHead.value : null;
  }

  toString(callback) {
    return this.linkedList.toString(callback);
  }
}
