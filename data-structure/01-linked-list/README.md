# Linked List 链表

- 链表
  - 数据元素的线性集合
  - 元素的顺序不由其在内存中的物理位置决定
  - 每个节点：{ data, refToNextEle }
  - 优点：高效地插入、删除任意位置的元素
  - 缺点：访问时间是线性的；难以管道化；快速访问（如随机访问）不可行
  - 数组比链表具有更好的位置缓存

- reverse理解
  |            prevNode           |            currNode           |         nextNode         |
  |-------------------------------|-------------------------------|--------------------------|
  |                          null | A -> B -> C -> D -> E -> null |                     null |
  |                     A -> null | B -> C -> D -> E -> null      | B -> C -> D -> E -> null |
  |                B -> A -> null | C -> D -> E -> null           |      C -> D -> E -> null |
  |           C -> B -> A -> null | D -> E -> null                |           D -> E -> null |
  |      D -> C -> B -> A -> null | E -> null                     |                E -> null |
  | E -> D -> C -> B -> A -> null | null                          |                     null |

- 复杂度

  - 时间复杂度

    |访问|搜索|插入|删除|
    |---|---|----|----|
    |O(n)|O(n)|O(1)|O(n)|

  - 空间复杂度

    O(n)
