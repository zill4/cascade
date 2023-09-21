Object.defineProperty(exports, "__esModule", { value: true });
var observableContext = window['$_cascade_observable_context'] || {};
window['$_cascade_observable_context'] = observableContext;
observableContext.computedContexts = observableContext.computedContexts || [];
observableContext.context = observableContext.context || undefined;
class Observable {
    constructor(value) {
        this.value = value;
        this.subscribers = [];
        this.id = Observable.id;
        Observable.id++;
    }
    getValue() {
        if (observableContext.context) {
            observableContext.context.push(this);
        }
        return this.value;
    }
    peek() {
        return this.value;
    }
    peekDirty() {
        return this.value;
    }
    track() {
        return this.promise || Promise.resolve();
    }
    async setValue(value) {
        if (this.value !== value || this.alwaysNotify) {
            var oldValue = this.value;
            this.value = value;
            this.promise = this.publish(value, oldValue);
            await this.promise;
        }
    }
    subscribeOnly(subscriber) {
        if (subscriber) {
            this.subscribers.push(subscriber);
        }
    }
    subscribe(subscriber) {
        if (subscriber) {
            this.subscribers.push(subscriber);
            if (typeof subscriber === 'function') {
                subscriber(this.value);
            }
            else {
                subscriber.notify();
            }
        }
    }
    unsubscribe(subscriber) {
        if (subscriber) {
            var index = this.subscribers.indexOf(subscriber);
            if (index >= 0) {
                this.subscribers.splice(index, 1);
            }
        }
    }
    async publish(value, oldValue) {
        if (this.subscribers.length) {
            let subscribers = this.subscribers.filter((subscriber) => {
                if (typeof subscriber === 'function') {
                    subscriber(this.value, oldValue);
                    return false;
                }
                else {
                    return true;
                }
            }).map((subscriber) => subscriber.notify());
            let result = await Promise.all(subscribers);
        }
    }
    dispose(recursive) {
        this.subscribers.length = 0;
    }
    static getContext() {
        return observableContext.context;
    }
    static pushContext() {
        observableContext.context = [];
        observableContext.computedContexts.unshift(observableContext.context);
        return observableContext.context;
    }
    static popContext() {
        var oldContext = observableContext.computedContexts.shift();
        observableContext.context = observableContext.computedContexts[0];
        return oldContext;
    }
}
Observable.id = 0;
exports.default = Observable;
//# sourceMappingURL=Observable.js.map