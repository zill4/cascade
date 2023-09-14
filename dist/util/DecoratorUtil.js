Object.defineProperty(exports, "__esModule", { value: true });
const Cascade_1 = require("../modules/Cascade");
class DecoratorUtil {
    static createObservableIfNotExists(obj, property, factory, value, set, thisArg) {
        Cascade_1.default.attachGraph(obj);
        if (!obj._graph.observables[property]) {
            obj._graph.observables[property] = factory(value, thisArg);
        }
        else if (set) {
            obj._graph.observables[property].setValue(value);
        }
        return obj._graph.observables[property];
    }
    static attachObservable(target, propertyKey, factory, readOnly = false) {
        Object.defineProperty(target, propertyKey, {
            enumerable: true,
            configurable: true,
            get: function () {
                return DecoratorUtil.createObservableIfNotExists(this, propertyKey, factory, undefined, false, this).getValue();
            },
            set: readOnly ? undefined : function (value) {
                DecoratorUtil.createObservableIfNotExists(this, propertyKey, factory, value, true, this);
            }
        });
    }
}
exports.default = DecoratorUtil;
//# sourceMappingURL=DecoratorUtil.js.map