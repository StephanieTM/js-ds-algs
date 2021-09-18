# Promises/A+

> via [doc](https://promisesaplus.com/)

## 介绍

一个Promise代表一个异步操作的最终结果，与Promise交互的主要方式是通过 `.then` 方法，它会注册回调函数来接收Promise的最终值或失败的原因。

Promise/A+规范详细说明了then方法的行为，提供了可交互的基础，但不包括Promise的创建、完成或拒绝。

## 术语

1. `promise`是一个拥有满足此标准的`then`方法的对象或函数
2. `thenable`是一个定义了`then`方法的对象或函数
3. `value`是任何合法的JavaScript值，包括`undefined`, `a thenable`, `a promise`
4. `exception`是通过`throw`语句抛出的值
5. `reason`是用来说明promise为何被拒绝的值
