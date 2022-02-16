/**
 * new关键字做了什么
 * 1. 创建一个空对象
 * 2. 将空对象的原型（__proto__）指向构造函数的原型属性（prototype）上
 * 3. 执行构造函数,（这里将构造函数内部的this指向空对象）
 * 4. 执行构造函数后，如果返回值是对象类型，则将结果返回，否则返回创建的对象
 */

function newFunc(context, ...args) {
  // const obj = {};
  // obj.__proto__ = constructor.prototype;
  const obj = Object.create(context.prototype);
  const ret = context.call(obj, ...args);
  return typeof ret === 'object' ? ret : obj;
}

// Object.create 实现
Object.prototype.create = function (daProto) {
  const obj = {};
  obj.__proto__ = daProto;
  return obj;
}

// e.g
function Person(name) {
  this.name = name
}

const person1 = new Person('pc');
console.log(person1);
console.log(person1.__proto__ === Person.prototype); // true
console.log(person1.__proto__.constructor === Person); // true
console.log(Person.prototype.constructor === Person); // true

const a = {b: 1}
console.log(a);
console.log(a.__proto__ === Object.prototype); // true
console.log(a.__proto__.constructor === Object); // true
console.log(Object.prototype.constructor === Object); // true
