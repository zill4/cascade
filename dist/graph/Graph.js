Object.defineProperty(exports, "__esModule", { value: true });
const Computed_1 = require("./Computed");
class Graph {
    constructor(parent) {
        this.observables = {};
        this.parent = parent;
    }
    peek(property) {
        return this.observables[property].peek();
    }
    peekDirty(property) {
        return this.observables[property].peekDirty();
    }
    track(property) {
        return this.observables[property].track();
    }
    trackAll() {
        return Promise.all(Object.values(this.observables).map(observable => observable.track()));
    }
    getReferences(property) {
        var observable = this.observables[property];
        if (observable instanceof Computed_1.default) {
            return observable.references;
        }
        else {
            return [];
        }
    }
    getSubscribers(property) {
        var observable = this.observables[property];
        if (observable) {
            return observable.subscribers;
        }
        else {
            return [];
        }
    }
    dispose() {
        for (var index in this.observables) {
            if (this.observables.hasOwnProperty(index)) {
                this.observables[index].dispose();
            }
        }
    }
    disposeAll() {
        for (var index in this.observables) {
            if (this.observables.hasOwnProperty(index)) {
                var observable = this.observables[index];
                var value = observable.peek();
                if (value && value._graph) {
                    value._graph.disposeAll();
                }
                observable.dispose();
            }
        }
    }
    subscribe(property, subscriber) {
        if (!this.observables[property]) {
            var value = this.parent[property];
        }
        this.observables[property].subscribe(subscriber);
        return value;
    }
    subscribeOnly(property, subscriber) {
        if (!this.observables[property]) {
            var value = this.parent[property];
        }
        this.observables[property].subscribeOnly(subscriber);
        return value;
    }
    unsubscribe(property, subscriber) {
        if (this.observables[property]) {
            this.observables[property].unsubscribe(subscriber);
        }
    }
    setAlwaysNotify(property, alwaysNotify) {
        if (!this.observables[property]) {
            var value = this.parent[property];
        }
        this.observables[property].alwaysNotify = alwaysNotify;
    }
}
exports.default = Graph;
//# sourceMappingURL=Graph.js.map