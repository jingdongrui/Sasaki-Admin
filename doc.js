// 响应式数据处理，构造一个响应式对象
class Observer {
  constructor(data) {
    this.data = data;
    this.walk(data);
  }

  // 遍历对象的每个 已定义 属性，分别执行 defineReactive
  walk(data) {
    if (!data || typeof data !== "object") {
      return;
    }

    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
    });
  }

  // 为对象的每个属性重新设置 getter/setter
  defineReactive(obj, key, val) {
    // 每个属性都有单独的 dep 依赖管理
    const dep = new Dep();

    // 通过 defineProperty 进行操作代理定义
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      // 值的读取操作，进行依赖收集
      get() {
        if (Dep.target) {
          dep.depend();
        }
        return val;
      },
      // 值的更新操作，触发依赖更新
      set(newVal) {
        if (newVal === val) {
          return;
        }
        val = newVal;
        dep.notify();
      }
    });
  }
}

// 观察者的构造函数，接收一个表达式和回调函数
class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    this.getter = parsePath(expOrFn);
    this.cb = cb;
    this.value = this.get();
  }

  // watcher 实例触发值读取时，将依赖收集的目标对象设置成自身，
  // 通过 call 绑定当前 Vue 实例进行一次函数执行，在运行过程中收集函数中用到的数据
  // 此时会在所有用到数据的 dep 依赖管理中插入该观察者实例
  get() {
    Dep.target = this;
    const value = this.getter.call(this.vm, this.vm);
    // 函数执行完毕后将依赖收集目标清空，避免重复收集
    Dep.target = null;
    return value;
  }

  // dep 依赖更新时会调用，执行回调函数
  update() {
    const oldValue = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldValue);
  }
}

// 依赖收集管理者的构造函数
class Dep {
  constructor() {
    // 保存所有 watcher 观察者依赖数组
    this.subs = [];
  }

  // 插入一个观察者到依赖数组中
  addSub(sub) {
    this.subs.push(sub);
  }

  // 收集依赖，只有此时的依赖目标（watcher 实例）存在时才收集依赖
  depend() {
    if (Dep.target) {
      this.addSub(Dep.target);
    }
  }

  // 发送更新，遍历依赖数组分别执行每个观察者定义好的 update 方法
  notify() {
    this.subs.forEach(sub => {
      sub.update();
    });
  }
}

Dep.target = null;

// 表达式解析
function parsePath(path) {
  const segments = path.split(".");
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }
      obj = obj[segments[i]];
    }
    return obj;
  };
}
