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

  find({ value = undefined, callback = undefined }) {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;

    while (currentNode) {
      // 优先使用callback判断是否命中被寻找元素
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      if (value !== undefined && this.compare.equal(value, currentNode.value)) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  deleteTail() {
    // 删除后与删除前的区别：tail变化，故计算出删除后的tail即可

    const deletedTail = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    // 存放最终的tail
    let currentNode = this.head;

    // currentNode有下一个元素，但是下下个元素为空（下下个元素是tail），则删除下下个元素，且currentNode的新next是null
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }

  deleteHead() {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  fromArray(values) {
    values.forEach(value => this.append(value));

    return this;
  }

  toArray() {
    const nodes = [];
    
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  toString(callback) {
    return this.toArray().map(node => node.toString(callback)).toString();
  }

  reverse() {
    // =============================================================================================================
    //                                        before: A -> B -> C -> D -> E -> null
    //                                         after: E -> D -> C -> B -> A -> null
    // =============================================================================================================
    //                prevNode               |              currNode               |            nextNode
    //   prevNode = currNode(next=>prevNode) |       currNode = currNode.next      |    nextNode = currNode.next
    // --------------------------------------┼-------------------------------------┼--------------------------------
    //                               null    |    A -> B -> C -> D -> E -> null    |                        null
    //                          A -> null    |         B -> C -> D -> E -> null    |    B -> C -> D -> E -> null
    //                     B -> A -> null    |              C -> D -> E -> null    |         C -> D -> E -> null
    //                C -> B -> A -> null    |                   D -> E -> null    |              D -> E -> null
    //           D -> C -> B -> A -> null    |                        E -> null    |                   E -> null
    //      E -> D -> C -> B -> A -> null    |                             null    |                        null
    // =============================================================================================================
    // 

    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currNode) {
      // nextNode临时存放原始链表的下一个元素
      nextNode = currNode.next;

      currNode.next = prevNode;

      // prevNode存放最终的头元素，每个迭代都将上次计算的prevNode链接在currNode之后，并将新的currNode赋值给prevNode
      prevNode = currNode;

      // currNode变成原始链表的下一个元素
      currNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }

}
