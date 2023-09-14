Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyHash = void 0;
const Observable_1 = require("./Observable");
class ObservableHash extends Observable_1.default {
    constructor(value) {
        super();
        this._innerValue = value;
        this.value = this.wrapHash((value instanceof Object) ? value : {});
    }
    wrapHash(value) {
        return new ProxyHash((value instanceof ProxyHash) ?
            Object.assign({}, value) :
            value, this);
    }
    async setValue(value) {
        if (this._innerValue !== value || this.alwaysNotify) {
            this._innerValue = value;
            var oldValue = this.value;
            value = this.wrapHash((value instanceof Object) ? value : {});
            this.value = value;
            this.promise = this.publish(value, oldValue);
            await this.promise;
        }
    }
}
exports.default = ObservableHash;
class ProxyHash {
    constructor(value, containingObservable) {
        let inner = new Proxy(value, {
            set: (target, property, value, receiver) => {
                let result = true;
                let oldValue = target[property];
                if (oldValue !== value || containingObservable.alwaysNotify) {
                    result = (target[property] = value) === value;
                    if (result) {
                        containingObservable.publish(target, target);
                    }
                }
                return result;
            },
            deleteProperty: (target, property) => {
                let result = delete target[property];
                if (result) {
                    containingObservable.publish(target, target);
                }
                return result;
            }
        });
        return inner;
    }
}
exports.ProxyHash = ProxyHash;
//# sourceMappingURL=ObservableHash.js.map