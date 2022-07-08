window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
  let elements;
  if (typeof selectorOrArrayOrTemplate === "string") {
    if (selectorOrArrayOrTemplate[0] === "<") {
      //  创建div
      elements = [createElement(selectorOrArrayOrTemplate)];
    } else {
      //  查找 div
      elements = document.querySelectorAll(selectorOrArrayOrTemplate);
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    elements = selectorOrArrayOrTemplate;
  }

  function createElement(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  }
  //  api可以操作elements
  const api = Object.create(jQuery.prototype); // 创建一个对象，这个对象的 __proto__ 为括号里面的东西
  // const api = {__proto__: jQuery.prototype}
  Object.assign(api, {
    elements: elements,
    oldApi: selectorOrArrayOrTemplate.oldApi,
  });
  // api.elements = elements
  // api.oldApi = selectorOrArrayOrTemplate.oldApi
  return api;
};

jQuery.fn = jQuery.prototype = {
  constructor: jQuery,
  jquery: true,
  jquery: true,
  get(index) {
    return elements[index];
  },
  appendTo(node) {
    if (node instanceof Element) {
      this.each((el) => node.appendChild(e1)); //  遍历 elements ,对每个el 进行node.appendChild 操作
    } else if (node.jquery === true) {
      this.each((el) => node.get(0).appendChild(el)); //  遍历elements , 对每个 el  进行 node.get(0).appendChild(el) 操作
    }
  },
  append(children) {
    if (children instanceof Element) {
      this.get(0).appendChild(children);
    } else if (children instanceof HTMLCollection) {
      for (let i = 0; i < children.length; i++) {
        this.get(0).appendChild(children[i]);
      }
    } else if (children.jquery === true) {
      children.each((node) => this.get(0).appendChild(node));
    }
  },
  find(selector) {
    let array = [];
    for (let i = 0; i < elements.length; i++) {
      const elements2 = Array.from(elements[i].querySelectorAll(selector));
      array = array.concat(elements2);
    }
    array.oldApi = this; // this就是旧的api
    return jQuery(array);
  },
  end(fn) {
    for (let i = 0; i < elements.length; i++) {
      fn.call(null, elements[i], i);
    }
    return this;
  },
  parent() {
    const array = [];
    this.each((node) => {
      if (array.indexOf(node.parentNode) === -1) {
        array.push(node.parentNode);
      }
    });
    return jQuery(array);
  },
  children() {
    const array = [];
    this.each((node) => {
      array.push(...node.children);
    });
    return jQuery(array);
  },
  print() {
    console.log(elements);
  },
  //  闭包：函数访问外部变量
  addClass(className) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add(className);
    }
    //  obj.fn(p1)等价于obj.fn.call(obj,p1);//  函数里面的 this 就是 obj
    return this; //  所以 api 可以改成 this
  },
  end() {
    return this.oldApi; // this 就是新的 api
  },
};
