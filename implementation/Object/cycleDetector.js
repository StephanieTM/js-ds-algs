/**

判断一个对象是否有循环引用

var obj = {
    a: {
        c: [
            1, 2
        ]
    },
    b: 1
}
obj.a.c.d = obj
console.log(cycleDetector(obj)) // true

 */

function cycleDetector(obj) {
  const set = new Set();
  set.add(obj);

  let result = false;

  function detect(o) {
    const keys = Object.key(o);
    for (const key of keys) {
      const temp = o[key];
      if (typeof temp === 'object' && temp !== null) {
        if (set.has(temp)) {
          result = true;
          return;
        }

        set.add(temp);
        detect(temp);
      }
    }
  }

  detect(obj);

  return result;
}
