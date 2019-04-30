function Animal(name) {
    this.name = name || 'Animal';

    this.sleep = function () {
        console.log(this.name + ' is sleeping!');
    }
}

Animal.prototype.eat = function (food) {
    console.log(this.name + ' is eating ' + food);
};
let animal = new Animal();
let num = 1;
let A = [animal, num, 's', 10.8];
let B = clone(A);
console.log(B);
let animal2 = clone(animal);
console.log(animal);
console.log(Object.getPrototypeOf(animal));
//Object.setPrototypeOf(animal2, Object.getPrototypeOf(animal));
console.log(animal2);
animal2.eat();
console.log(random(50, 100));
console.log(shuffle(A));
console.log(typeof clone);

function random(from, to) {
    return Math.random() * from + (to - from);
}

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

Object.setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
    obj.__proto__ = proto;
    return obj;
};

Object.assign = Object.assign || function (dst, src) {
    let keys = Object.keys(src);
    for (let key of keys) {
        dst[key] = clone(src[key]);
    }
    return dst;
};

function clone(src) {
    if (src instanceof Array) {
        let dst = new Array(src.length);
        for (let i = 0; i < src.length; ++i)
            dst[i] = clone(src[i]);
        return dst;
    } else if (src instanceof Object) {
        let dst = Object.assign({}, src);
        return Object.setPrototypeOf(dst, Object.getPrototypeOf(src));
    }
    return src;
}

function inheritProtoType(subType, superType) {
    let prototype = Object.create(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
    return subType;
}

function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}
SuperType.prototype.sayName = function () {
    alert(this.name);
};

function SubType(name, age) {
    //inherit properties
    SuperType.call(this, name);
    this.age = age;
}
//inherit methods
inheritProtoType(SubType, SuperType);
SubType.prototype.sayAge = function () {
    alert(this.age);
};

let instance = new SubType('Lost', 20);
console.log(instance);
let instance2 = Object.create(instance);
instance2.colors.push('black')
console.log(instance);
console.log(instance2);


let xhr = new XMLHttpRequest();
/*
xhr.addEventListener('readystatechange', function () {
    switch (this.readyState) {
        case 4:
            if (this.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    console.log(xhr.response);
                    console.log(xhr.getAllResponseHeaders());
                } else {
                    console.log(xhr.statusText);
                }
            };
            break;
        default:
            console.log(this.readyState);
            break;
    }
});
*/
xhr.addEventListener('load', function () {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        console.log(xhr.response);
        console.log(xhr.getAllResponseHeaders());
    } else {
        console.log(xhr.statusText);
    };
})

xhr.addEventListener('progress', function (e) {
    if (e.lengthComputable) {
        let indicator = 'Received ' + e.loaded + ' of ' + e.total + ' bytes';
    console.log(indicator);
}
});

//xhr.open('get', 'https://integrations.fitanalytics.com/shop/massimodutti/pdp.js');
//xhr.open('get', 'http://img1.imgtn.bdimg.com/it/u=362675696,1815692663&fm=26&gp=0.jpg');
//xhr.send(null);

Function.prototype.$call = function(target, ...args){
    target.fn = this;
    target.fn(...args);
    delete target.fn;
}

function displayInfo(age, gender){
    console.log(this.name, age, gender);
}

let person = {
    name: 'Nichole'
}
displayInfo.$call(person, 20, 'Male');


let me;
console.log(me);