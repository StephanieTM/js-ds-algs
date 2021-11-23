/**

统计对象的层数

const obj = {
    a: { b: [1] },
    c: { d: { e: { f: 1 } } }
}

console.log(loopGetLevel(obj)) // 4

 */

function getLevel(obj) {
  let result = 1;

  function calculate(o, level = 0) {
    if (typeof o === 'object') {
      for (const key in o) {
        if (typeof o[key] === 'object') {
          calculate(o[key], level + 1);
        } else {
          result = level + 1 > result ? level + 1 : result;
        }
      }
    } else {
      result = level > result ? level : result;
    }
  }

  calculate(obj);

  return result;
}
