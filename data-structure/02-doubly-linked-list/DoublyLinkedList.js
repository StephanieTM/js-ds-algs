import DoublyLinkedListNode from './DoublyLinkedListNode';
import Comparator from '../../utils/Comparator';

export default class DoublyLinkedList {
  constructor(compareFn) {
    this.head = null;
    this.tail = null;

    this.compare = new Comparator(compareFn);
  }

  prepend(value) {
    const newNode = new DoublyLinkedListNode(value, this.head);

    // 如果已有头部节点，那么插入新节点后此头部节点将不再是头部
    if (this.head) {
      this.head.previous = newNode;
    }

    this.head = newNode;

    // 如果没有末尾节点，那么插入的新节点将成为末尾节点
    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value) {
    const newNode = new DoublyLinkedListNode(value);

    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    // 旧链新
    this.tail.next = newNode;
    // 新链旧
    newNode.previous = this.tail;
    // 断链
    this.tail = newNode;

    return this;
  }

  delete(value) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;
    let currentNode = this.head;

    while (currentNode) {
      if (this.compare.equal(currentNode.value, value)) {
        deletedNode = currentNode;

        if (deletedNode === this.head) {
          // 如果删除的是头部节点

          // 新的头部是原来头部的下一个节点
          this.head = deletedNode.next;

          // 如果新的头部非空，将其前序节点置为空
          if (this.head) {
            this.head.previous = null;
          }

          // 如果删除的即是头部又是尾部节点
          if (deletedNode === this.tail) {
            this.tail = null;
          }
        } else if (deletedNode === this.tail) {
          // 如果删除的是尾部节点（且非头部节点）

          // 新的尾部是原来尾部的上一个节点
          this.tail = deletedNode.previous;
          this.tail.next = null;
        } else {
          // 如果删除的是中间节点（且非头部或尾部节点）

          // null <- A <-> B <-> C -> null
          // after delete B:
          // B.previous.next = B.next;
          // B.next.previous = B.previous;
          const previousNode = currentNode.previous;
          const nextNode = currentNode.next;

          previousNode.next = nextNode;
          nextNode.previous = previousNode;
        }
      }
      currentNode = currentNode.next;
    }

    return deletedNode;
  }

  find({ value: undefined, callback = undefined }) {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;

    while (currentNode) {
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
    if (!this.tail) {
      return null;
    }

    const deletedTail = this.tail;

    if (this.head === this.tail) {
      // 头部节点和尾部节点为同一个节点（只有一个节点）
      this.head = null;
      this.tail = null;
    } else {
      // 将被删除的尾部节点之前有非空节点
      this.tail = deletedTail.previous;
      this.tail.next = null;
    }

    return deletedTail;
  }

  deleteHead() {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    if (this.head === this.tail) {
      // 头部节点和尾部节点为同一个节点（只有一个节点）
      this.head = null;
      this.tail = null;
    } else {
      // 将被删除的头部节点之后有非空节点
      this.head = deletedHead.next;
      this.head.previous = null;
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
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currNode) {
      nextNode = currNode.next;
      prevNode = currNode.previous;

      currNode.next = prevNode;
      currNode.previous = nextNode;

      prevNode = currNode;
      currNode = nextNode;
    }
    
    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}
