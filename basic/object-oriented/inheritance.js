function Person(name) {
  this.name = name;
  this.say = function () {
    console.log(this.name, 'say：hello')
  }
}

Person.prototype.eat = function (food) {
  console.log(this.name + '正在吃：' + food);
}

/**
 * 原型链继承
 * 缺点：1、无法实现多继承 2、多个实例对引用类型的操作会被篡改
 */
function Boy() {
}

Boy.prototype = new Person('张三');
let boy = new Boy();
boy.eat('水果');

/**
 * 构造函数继承
 * 缺点：1、不能继承原型属性/方法 2、方法都在构造函数中定义，无法复用
 */
function Boy() {
  Person.call(this);
}

let boy = new Boy();
boy.say();
console.log(boy.name);

/**
 * 组合继承
 * 缺点：1、调用了两次Person()，产生了两份实例
 */
function Boy(name) {
  Person.call(this, name);
}

Boy.prototype = new Person();
Boy.prototype.constructor = Boy;

let boy = new Boy('张三');
boy.say();
boy.eat('水果');
let boy1 = new Boy('李四');
boy1.say();
boy1.eat('肉');

/**
 * 原型式继承
 * 缺点：1、多个实例对引用类型的操作会被篡改 2、无法传递参数
 */
function Boy(obj) {
  function F() {
  }

  F.prototype = obj;
  return new F();
}

let boy = Boy(new Person('张三'));
boy.say();
boy.eat('水果');


/**
 * 寄生组合式继承
 * 优点: 1、相对于组合继承调用了一次Person  2、原型链不变 能够正常使用instanceof 和isPrototypeOf()
 */
function inheritPrototype(subType, superType) {
  var prototype = Object.create(superType.prototype); // 创建对象，创建父类原型的一个副本
  prototype.constructor = subType;                    // 增强对象，弥补因重写原型而失去的默认的constructor 属性
  subType.prototype = prototype;                      // 指定对象，将新创建的对象赋值给子类的原型
}

function Boy(name) {
  Person.call(this, name);
}

// Boy.prototype = new Person();
// Boy.prototype.constructor = Boy;
inheritPrototype(Boy, Person); // 将父类原型指向子类
let boy = new Boy('张三');
boy.say();
boy.eat('水果');


/**
 * es6 继承
 */
class Person {
  constructor(name) {
    this.name = name;
  }
}

class Boy extends Person {
  constructor(props) {
    super(props);
  }
}

