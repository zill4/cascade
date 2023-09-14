Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyArray = void 0;
const Observable_1 = require("./Observable");
class ObservableArray extends Observable_1.default {
    constructor(value) {
        super();
        this._innerValue = value;
        this.value = this.wrapArray((value instanceof Array) ? value : []);
    }
    wrapArray(value) {
        return new ProxyArray((value instanceof ProxyArray) ?
            value.slice(0) :
            value, this);
    }
    async setValue(value) {
        if (this._innerValue !== value || this.alwaysNotify) {
            this._innerValue = value;
            var oldValue = this.value;
            value = this.wrapArray((value instanceof Array) ? value : []);
            this.value = value;
            this.promise = this.publish(value, oldValue);
            await this.promise;
        }
    }
}
exports.default = ObservableArray;
class ProxyArray extends Array {
    constructor(value, containingObservable) {
        super();
        let inner = new Proxy(value, {
            set: (target, property, value, receiver) => {
                let result = true;
                let oldValue = target[property];
                if (oldValue !== value || containingObservable.alwaysNotify) {
                    result = (target[property] = value) === value;
                    if (result && isFinite(Number(property)) || property === 'length') {
                        containingObservable.publish(target, target);
                    }
                }
                return result;
            },
            deleteProperty: (target, property) => {
                let result = delete target[property];
                if (result && isFinite(Number(property))) {
                    containingObservable.publish(target, target);
                }
                return result;
            }
        });
        return inner;
    }
}
exports.ProxyArray = ProxyArray;
//# sourceMappingURL=ObservableArray.js.map