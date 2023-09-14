Object.defineProperty(exports, "__esModule", { value: true });
exports.computed = exports.observable = exports.hash = exports.array = void 0;
const Cascade_1 = require("./Cascade");
const Observable_1 = require("../graph/Observable");
const ObservableArray_1 = require("../graph/ObservableArray");
const ObservableHash_1 = require("../graph/ObservableHash");
const Computed_1 = require("../graph/Computed");
function createObservableIfNotExists(obj, property, value, set) {
    Cascade_1.default.attachGraph(obj);
    if (!obj._graph.observables[property]) {
        obj._graph.observables[property] = new Observable_1.default(value);
    }
    else if (set) {
        obj._graph.observables[property].setValue(value);
    }
    return obj._graph.observables[property];
}
function createArrayIfNotExists(obj, property, value, set) {
    Cascade_1.default.attachGraph(obj);
    if (!obj._graph.observables[property]) {
        obj._graph.observables[property] = new ObservableArray_1.default(value);
    }
    else if (set) {
        obj._graph.observables[property].setValue(value);
    }
    return obj._graph.observables[property];
}
function createHashIfNotExists(obj, property, value, set) {
    Cascade_1.default.attachGraph(obj);
    if (!obj._graph.observables[property]) {
        obj._graph.observables[property] = new ObservableHash_1.default(value);
    }
    else if (set) {
        obj._graph.observables[property].setValue(value);
    }
    return obj._graph.observables[property];
}
function createComputedIfNotExists(obj, property, definition, defer, thisArg, setter) {
    Cascade_1.default.attachGraph(obj);
    if (!obj._graph.observables[property]) {
        obj._graph.observables[property] = new Computed_1.default(definition, defer, thisArg, setter);
    }
    return obj._graph.observables[property];
}
function attachObservable(target, propertyKey) {
    Object.defineProperty(target, propertyKey, {
        enumerable: true,
        configurable: true,
        get: function () {
            return createObservableIfNotExists(this, propertyKey).getValue();
        },
        set: function (value) {
            createObservableIfNotExists(this, propertyKey, value, true);
        }
    });
}
function array(target, propertyKey) {
    Object.defineProperty(target, propertyKey, {
        enumerable: true,
        configurable: true,
        get: function () {
            return createArrayIfNotExists(this, propertyKey).getValue();
        },
        set: function (value) {
            createArrayIfNotExists(this, propertyKey, value, true);
        }
    });
}
exports.array = array;
function hash(target, propertyKey) {
    Object.defineProperty(target, propertyKey, {
        enumerable: true,
        configurable: true,
        get: function () {
            return createHashIfNotExists(this, propertyKey).getValue();
        },
        set: function (value) {
            createHashIfNotExists(this, propertyKey, value, true);
        }
    });
}
exports.hash = hash;
function attachComputed(target, propertyKey, descriptor, definition, setter) {
    descriptor = descriptor || {};
    definition = definition || descriptor.get;
    descriptor.enumerable = true;
    descriptor.get = function () {
        return createComputedIfNotExists(this, propertyKey, definition, false, this, setter).getValue();
    };
    return descriptor;
}
function observable(target, propertyKey, descriptor) {
    if (descriptor) {
        attachComputed(target, propertyKey, descriptor);
    }
    else {
        if (Cascade_1.default.reflectAvailable) {
            var type = Reflect.getMetadata("design:type", target, propertyKey);
        }
        if (type === Array) {
            array(target, propertyKey);
        }
        else {
            attachObservable(target, propertyKey);
        }
    }
}
exports.observable = observable;
function computed(definition, setter) {
    return function (target, propertyKey, descriptor) {
        return attachComputed(target, propertyKey, descriptor, definition, setter);
    };
}
exports.computed = computed;
//# sourceMappingURL=Decorators.js.map