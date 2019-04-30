Object.setPrototypeOf = Object.setPrototypeOf || function (obj: Object, proto: Object) {
    //obj.__proto__ = proto;
    return obj;
};

Object.assign = Object.assign || function (dst: Object, src: Object) {
    let keys = Object.keys(src);
    for (let key of keys) {
        dst[key] = clone(src[key]);
    }
    return dst;
};

Function.prototype.call = Function.prototype.call || function(target, ...args){
    target.fn = this;
    target.fn(...args);
    delete target.fn;
}

function clone(src: Object, cloneProto: boolean = false) {
    if (src instanceof Array) {
        let dst = new Array(src.length);
        for (let i = 0; i < src.length; ++i)
            dst[i] = clone(src[i]);
        return dst;
    }
    else if (src instanceof Object) {
        let dst = Object.assign({}, src);
        if (cloneProto)
            dst = Object.setPrototypeOf(dst, Object.getPrototypeOf(src));
        return dst;
    }
    return src;
};

function random(from: number, to: number): number {
    return Math.random() * from + (to - from);
};

function shuffle(arr: Array<any>): Array<any> {
    return arr.sort(() => Math.random() - 0.5);
};


function inheritPrototype(subType: Function, superType: Function) {
    let prototype = Object.create(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
    return subType;
}

const Utils = {
    clone,
    random,
    shuffle,
    inheritPrototype
}

export default Utils;