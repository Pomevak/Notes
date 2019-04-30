"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Object.setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
    return obj;
};
Object.assign = Object.assign || function (dst, src) {
    let keys = Object.keys(src);
    for (let key of keys) {
        dst[key] = clone(src[key]);
    }
    return dst;
};
function clone(src, cloneProto = false) {
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
}
;
function random(from, to) {
    return Math.random() * from + (to - from);
}
;
function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}
;
function inheritPrototype(subType, superType) {
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
};
exports.default = Utils;
//# sourceMappingURL=utils.js.map