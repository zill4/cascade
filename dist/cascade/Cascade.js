Object.defineProperty(exports, "__esModule", { value: true });
const Graph_1 = require("../graph/Graph");
const Observable_1 = require("../graph/Observable");
const Computed_1 = require("../graph/Computed");
const ObservableArray_1 = require("../graph/ObservableArray");
const ObservableHash_1 = require("../graph/ObservableHash");
const VirtualNode_1 = require("../dom/VirtualNode");
const Fragment_1 = require("../dom/Fragment");
const ComponentNode_1 = require("../dom/ComponentNode");
const CascadeError_1 = require("../util/CascadeError");
class Cascade {
    static disposeAll(obj) {
        var graph = obj['_graph'];
        for (var name in obj) {
            if (obj.hasOwnProperty(name)) {
                if (!graph || !graph.observables[name]) {
                    Cascade.disposeAll(obj[name]);
                }
            }
        }
        if (graph) {
            for (var index in graph.observables) {
                if (graph.observables.hasOwnProperty(index)) {
                    var value = graph.observables[index].value;
                    Cascade.disposeAll(value);
                    graph.observables[index].dispose();
                }
            }
        }
    }
    static attachGraph(obj) {
        if (!obj._graph) {
            Object.defineProperty(obj, '_graph', {
                configurable: true,
                writable: true,
                enumerable: false,
                value: new Graph_1.default(obj),
            });
        }
        return obj._graph;
    }
    static createProperty(obj, property, observable) {
        var graph = Cascade.attachGraph(obj);
        if (graph.observables[property]) {
            observable.subscribers = graph.observables[property].subscribers;
        }
        graph.observables[property] = observable;
    }
    static attachObservable(obj, property, observable, readOnly = false) {
        Cascade.createProperty(obj, property, observable);
        Object.defineProperty(obj, property, {
            enumerable: true,
            configurable: true,
            get: function () {
                return observable.getValue();
            },
            set: readOnly
                ? undefined
                : function (value) {
                    observable.setValue(value);
                },
        });
    }
    static createObservable(obj, property, value) {
        Cascade.attachObservable(obj, property, new Observable_1.default(value));
    }
    static createComputed(obj, property, definition, defer, setter) {
        Cascade.attachObservable(obj, property, new Computed_1.default(definition, defer, undefined, setter), true);
    }
    static createObservableArray(obj, property, value) {
        Cascade.attachObservable(obj, property, new ObservableArray_1.default(value));
    }
    static createObservableHash(obj, property, value) {
        Cascade.attachObservable(obj, property, new ObservableHash_1.default(value));
    }
    static setAlwaysNotify(obj, property, alwaysNotify) {
        let graph = this.attachGraph(obj);
        graph.setAlwaysNotify(property, alwaysNotify);
    }
    static subscribe(obj, property, subscriberFunction, createDisposer = false) {
        let graph = this.attachGraph(obj);
        graph.subscribe(property, subscriberFunction);
        return createDisposer
            ? function () {
                graph.unsubscribe(property, subscriberFunction);
            }
            : undefined;
    }
    static subscribeOnly(obj, property, subscriberFunction, createDisposer = false) {
        let graph = this.attachGraph(obj);
        graph.subscribeOnly(property, subscriberFunction);
        return createDisposer
            ? function () {
                graph.unsubscribe(property, subscriberFunction);
            }
            : undefined;
    }
    static unsubscribe(obj, property, subscriberFunction) {
        var graph = obj['_graph'];
        if (graph) {
            graph.unsubscribe(property, subscriberFunction);
        }
    }
    static waitToEqual(obj, property, testValue, timeout) {
        let graph = this.attachGraph(obj);
        return new Promise((resolve, reject) => {
            let resolved = false;
            let subscriberFunction = (value) => {
                if (value === testValue) {
                    if (timerId) {
                        window.clearTimeout(timerId);
                    }
                    if (!resolved) {
                        resolved = true;
                        window.setTimeout(() => {
                            graph.unsubscribe(property, subscriberFunction);
                        });
                        resolve(value);
                    }
                }
            };
            if (timeout) {
                var timerId = window.setTimeout(() => {
                    graph.unsubscribe(property, subscriberFunction);
                    reject(new Error(CascadeError_1.CascadeError.TimeoutElapsed));
                }, timeout);
            }
            graph.subscribeOnly(property, subscriberFunction);
        });
    }
    static peek(obj, property) {
        return obj['_graph'] ? obj['_graph'].peek(property) : undefined;
    }
    static peekDirty(obj, property) {
        return obj['_graph'] ? obj['_graph'].peekDirty(property) : undefined;
    }
    static track(obj, property) {
        let graph = this.attachGraph(obj);
        let observable = graph.observables[property];
        if (observable) {
            return observable.track();
        }
        else {
            throw new Error(CascadeError_1.CascadeError.NoObservable + property.toString());
        }
    }
    static trackAll(obj) {
        let graph = this.attachGraph(obj);
        return graph.trackAll();
    }
    static update(obj, property) {
        let graph = this.attachGraph(obj);
        let observable = graph.observables[property];
        if (observable && observable.update) {
            return observable.update();
        }
        else {
            throw new Error(CascadeError_1.CascadeError.NoObservable + property.toString());
        }
    }
    static set(obj, property, value) {
        let graph = this.attachGraph(obj);
        let observable = graph.observables[property];
        if (observable) {
            return observable.setValue(value);
        }
        else {
            throw new Error(CascadeError_1.CascadeError.NoObservable + property.toString());
        }
    }
    static run(obj, property) {
        let graph = this.attachGraph(obj);
        let observable = graph.observables[property];
        if (observable) {
            if (observable.runOnly) {
                return observable.runOnly();
            }
            else {
                return observable.peek();
            }
        }
        else {
            throw new Error(CascadeError_1.CascadeError.NoObservable + property.toString());
        }
    }
    static getObservable(obj, property) {
        let graph = this.attachGraph(obj);
        return graph.observables[property];
    }
    static getSubscribers(obj, property) {
        let graph = this.attachGraph(obj);
        return graph.getSubscribers(property);
    }
    static getReferences(obj, property) {
        let graph = this.attachGraph(obj);
        return graph.getReferences(property);
    }
    static wrapContext(callback, thisArg) {
        Observable_1.default.pushContext();
        if (thisArg) {
            callback.call(thisArg);
        }
        else {
            callback();
        }
        return Observable_1.default.popContext();
    }
    static createElement(type, props, ...children) {
        children = VirtualNode_1.default.fixChildrenArrays(children);
        if (typeof type === 'string') {
            return new VirtualNode_1.default(type, props, children);
        }
        else {
            return new ComponentNode_1.default(type, props, children);
        }
    }
    static render(node, virtualNode) {
        var fixedNode = typeof node === 'string' ? document.getElementById(node) : node;
        if (!fixedNode) {
            throw new Error(CascadeError_1.CascadeError.NoRootNode);
        }
        var renderedComponent = virtualNode.toNode();
        while (fixedNode.firstChild) {
            fixedNode.removeChild(fixedNode.firstChild);
        }
        if (renderedComponent instanceof Node) {
            fixedNode.appendChild(renderedComponent);
        }
        else {
            throw new Error(CascadeError_1.CascadeError.InvalidRootRender);
        }
        return renderedComponent;
    }
}
Cascade.Fragment = Fragment_1.default;
Cascade.reflectAvailable = typeof Reflect === 'object' && typeof Reflect.getMetadata === 'function';
Cascade.xlinkDeprecated = (function () {
    var _a;
    if (typeof SVGElement === 'undefined') {
        return true;
    }
    else {
        let use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttribute('href', 'abcd');
        return ((_a = use.href) === null || _a === void 0 ? void 0 : _a.baseVal) === 'abcd';
    }
})();
exports.default = Cascade;
//# sourceMappingURL=Cascade.js.map