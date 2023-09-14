Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("./Observable");
const ComputedQueue_1 = require("./ComputedQueue");
class Computed extends Observable_1.default {
    constructor(definition, defer = false, thisArg, setter) {
        super(undefined);
        this.references = [];
        this.definition = definition;
        this.thisArg = thisArg;
        this.setter = setter;
        if (defer) {
            this.dirty = true;
        }
        else {
            this.value = this.runDefinition(definition);
            this.dirty = false;
        }
    }
    getValue() {
        super.getValue();
        if (this.dirty) {
            this.runUpdate();
        }
        return this.value;
    }
    update() {
        this.dirty = true;
        return this.getValue();
    }
    peek() {
        if (this.dirty) {
            this.runUpdate();
        }
        return this.value;
    }
    peekDirty() {
        return this.value;
    }
    setValue(value) {
        if (this.setter) {
            let newValue = this.setter(value);
            if (this.value !== newValue || this.alwaysNotify) {
                var oldValue = this.value;
                this.value = newValue;
                return this.publish(newValue, oldValue);
            }
            else {
                return Promise.resolve();
            }
        }
        else {
            return Promise.resolve();
        }
    }
    notify() {
        if (!this.disposed) {
            this.notifyDirty();
            if (ComputedQueue_1.default.computedQueue.completed) {
                ComputedQueue_1.default.computedQueue = new ComputedQueue_1.default();
            }
            return ComputedQueue_1.default.computedQueue.add(this);
        }
        else {
            return Promise.resolve();
        }
    }
    notifyDirty() {
        if (!this.dirty) {
            this.dirty = true;
            for (var index = 0, length = this.subscribers.length; index < length; index++) {
                var subscriber = this.subscribers[index];
                if (subscriber instanceof Computed) {
                    subscriber.notifyDirty();
                }
            }
        }
    }
    async runUpdate() {
        if (!this.disposed && this.dirty) {
            var value = this.value;
            this.value = this.runDefinition(this.definition);
            this.dirty = false;
            if (this.value !== value || this.alwaysNotify) {
                await this.publish(this.value, value);
            }
        }
        return this.value;
    }
    runOnly() {
        this.value = this.runDefinition(this.definition);
        this.dirty = false;
        return this.value;
    }
    runDefinition(definition) {
        for (var index = 0, length = this.references.length; index < length; index++) {
            var reference = this.references[index];
            reference.unsubscribe(this);
        }
        Observable_1.default.pushContext();
        this.error = undefined;
        try {
            var output;
            if (this.thisArg) {
                output = definition.call(this.thisArg, this.value);
            }
            else {
                output = definition(this.value);
            }
        }
        catch (e) {
            this.error = e;
            console.error(e);
        }
        var context = Observable_1.default.popContext();
        if (!this.error) {
            let hash = {};
            let references = [];
            for (var index = 0, length = context.length; index < length; index++) {
                var reference = context[index];
                if (!hash[reference.id]) {
                    hash[reference.id] = reference;
                    references.push(reference);
                    reference.subscribeOnly(this);
                }
            }
            this.references = references;
        }
        return output;
    }
    dispose(recursive) {
        super.dispose(recursive);
        this.disposed = true;
        if (recursive) {
            for (var index = 0, length = this.references.length; index < length; index++) {
                var reference = this.references[index];
                reference.dispose(true);
            }
        }
        else {
            for (var index = 0, length = this.references.length; index < length; index++) {
                var reference = this.references[index];
                reference.unsubscribe(this);
            }
        }
    }
}
exports.default = Computed;
//# sourceMappingURL=Computed.js.map