/**

{
  tag: 'DIV',
  children: [
    {
      tag: 'SPAN',
      children: [],
    },
    {
      tag: 'UL',
      children: [
        { tag: 'LI', children: [] },
        { tag: 'LI', children: [] },
      ],
    },
  ],
}

将上方的DOM转化为下面的树结构对象

<div>
  <span></span>
  <ul>
    <li></li>
    <li></li>
  </ul>
</div>

 */

function tree2dom(vnode) {
  if (typeof vnode === 'number') {
    vnode = String(vnode);
  }

  if (typeof vnode === 'string') {
    return document.createTextNode(vnode);
  }

  const dom = document.createElement(vnode.tag);
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      const value = vnode.attrs[key];
      dom.setAttribute(key, value);
    });
  }

  vnode.children.forEach(child => dom.appendChild(tree2dom(child)));

  return dom;
}
