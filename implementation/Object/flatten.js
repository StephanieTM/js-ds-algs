/**

实现对象的扁平化

const obj = {
  a: {
    b: 1,
    c: 2,
    d: {
      e: 5
    },
  },
  b: [
    1,
    3,
    {
      a: 2,
      b: 3
    },
  ],
  c: 3,
}
 
flatten(obj) 结果返回如下
{
  'a.b': 1,
  'a.c': 2,
  'a.d.e': 5,
  'b[0]': 1,
  'b[1]': 3,
  'b[2].a': 2,
  'b[2].b': 3,
  'c': 3,
}

 */

const isObject = (val) => typeof val === 'object' && val !== null;

function flatten(obj) {
  if (!isObject(obj)) return;

  const result = {};
  const dfs = (cur, prefix = '') => {
    if (isObject(cur)) {
      if (Array.isArray(cur)) {
        // 数组
        cur.forEach((item, index) => {
          dfs(item, `${prefix}[${index}]`);
        });
      } else {
        // 对象
        for (let key in cur) {
          dfs(cur[key], `${prefix}${prefix ? '.' : ''}${key}`);
        }
      }
    } else {
      res[prefix] = cur;
    }
  };

  dfs(obj);

  return result;
}
