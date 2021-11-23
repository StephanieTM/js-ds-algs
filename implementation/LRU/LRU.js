/**

设计和实现一个 LRU（最近最少使用）缓存机制，它应该支持如下操作：获取数据 get 和写入数据 put

获取数据 get(key)
  - 如果密钥 key 存在于缓存中，则获取密钥的值（总是正数），否则返回 -1

写入数据 put(key, value)
  - 如果密钥已经存在，则变更其数据值；如果密钥不存在，则插入该组[密钥/数据值]
  - 当缓存容量达到上限时，它应该在写入新数据前删除最久未使用的数据值，从而为新的数据值留出空间

实例

const cache = new LRUCache(2); // 缓存容量 2

cache.put(1, 1);
cache.put(2, 2);
cache.get(1);           // 返回 1
cache.put(3, 3);        // 会使密钥 2 作废
cache.get(2);           // 未找到，返回 -1
cache.put(4, 4);        // 会使密钥 1 作废
cache.get(1);           // 未找到，返回 -1
cache.get(3);           // 返回 3
cache.get(4);           // 返回 4

 */

class LRUCache {
  constructor(size) {
    this.size = size;
    this.cache = new Map();
  }

  put(key, value) {
    // put 操作使 key 在缓存中的优先级变高
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    this.cache.set(key, value);
    if (this.cache.size > size) {
      // 超出容量时删除最久未使用的值
      this.cache.delete(this.cache.keys().next().value);
    }
  }

  get(key) {
    if (this.cache.has(key)) {
      const val = this.cache.get(key);
      
      // get 操作使 key 在缓存中的优先级变高
      this.cache.delete(key); // 删除
      this.cache.set(key, val); // 重设，使其顺序靠后

      return val;
    } else {
      return -1;
    }
  }
}
