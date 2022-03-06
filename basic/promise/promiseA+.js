/*文章： https://mp.weixin.qq.com/s/hqf-u2rrTNR3oB3pp6Kbiw*/

class MyPromise {
  constructor(executor) {
    try {
      executor(this._resolve, this._reject);
    } catch (error) {
      this._reject(error)
    }
  }

  status = 'pending';
  result = null;
  reason = null;
  onFulfilledCallback = [];
  onRejectedCallback = [];

  _resolve = (value) => {
    if (this.status === 'pending') {
      this.status = 'fulfilled';
      this.result = value;
      this.onFulfilledCallback.forEach((callback) => {
        callback(value);
      });
      // while (this.onFulfilledCallback.length) {
      //   this.onFulfilledCallback.shift()(value)
      // }
    }

  }
  _reject = (value) => {
    if (this.status === 'pending') {
      this.status = 'rejected';
      this.reason = value;
      this.onRejectedCallback.forEach((callback) => {
        callback(value);
      });
      // while (this.onRejectedCallback.length) {
      //   this.onRejectedCallback.shift()(value);
      // }
    }
  }

  then(onFulfilled, onRejected) {
    const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    const realOnRejected = typeof onRejected === 'function' ? onRejected : (reason) => {
      throw reason
    }
    const promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            let x = realOnFulfilled(this.result);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }

        })
      }
      if (this.status === 'fulfilled') {
        fulfilledMicrotask();
      }
      if (this.status === 'rejected') {
        realOnRejected(this.reason);
      }
      if (this.status === 'pending') {
        this.onFulfilledCallback.push(fulfilledMicrotask);
        this.onRejectedCallback.push(onRejected);
      }
    });
    return promise2;
  }

  static resolve(param) {
    if (param instanceof MyPromise) {
      return param
    }
    return new MyPromise((resolve) => {
      resolve(param);
    })
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    })
  }
}

function resolvePromise(promise, x, resolve, reject) {
  if (x === promise) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }
  // 判断x是不是 MyPromise 实例对象
  if (x instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    // 简化之后
    x.then(resolve, reject)
  } else {
    // 普通值
    resolve(x)
  }
}


// const promise = new MyPromise((resolve, reject) => {
//    console.log('start');
//    setTimeout(() => {
//        resolve('success');
//    }, 2000);
// })
/* 基础 */
// promise.then(value => {
//   console.log('resolve', value);
// }, reason => {
//   console.log('reject', reason);
// })

/* 多个then */
// promise.then(value => {
//   console.log(1)
//   console.log('resolve', value)
// })
// promise.then(value => {
//   console.log(2)
//   console.log('resolve', value)
// })
// promise.then(value => {
//   console.log(3)
//   console.log('resolve', value)
// })

/* 链式调用 */
// function other () {
//   return new MyPromise((resolve, reject) =>{
//     resolve('other')
//   })
// }
// promise.then(value => {
//   console.log(1)
//   console.log('resolve', value)
//   return other()
// }).then(value => {
//   console.log(2)
//   console.log('resolve', value)
// })

/* promise 返回自身 */
// const promise = new MyPromise((resolve, reject) => {
//   resolve('success')
// })
// const p1 = promise.then(value => {
//   console.log(1)
//   console.log('resolve', value)
//   return p1
// })
// // 运行的时候会走reject
// p1.then(value => {
//   console.log(2)
//   console.log('resolve', value)
// }, reason => {
//   console.log(3)
//   console.log(reason.message)
// })

/* 执行报错 */
// const promise = new MyPromise((resolve, reject) => {
//     // resolve('success')
//     throw new Error('执行器错误')
// })
// promise.then(value => {
//   console.log(1)
//   console.log('resolve', value)
// }, reason => {
//   console.log(2)
//   console.log(reason.message)
// })

/* then报错 */
// const promise = new MyPromise((resolve, reject) => {
//     resolve('success')
//  })
// promise.then(value => {
//   console.log(1)
//   console.log('resolve', value)
//   throw new Error('then error')
// }, reason => {
//   console.log(2)
//   console.log(reason.message)
// }).then(value => {
//   console.log(3)
//   console.log(value);
// }, reason => {
//   console.log(4)
//   console.log(reason.message)
// })

const promise = new MyPromise((resolve, reject) => {
  resolve(100)
})

promise
  .then()
  .then()
  .then()
  .then(value => console.log(value))
