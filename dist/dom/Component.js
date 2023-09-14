Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
const Cascade_1 = require("../cascade/Cascade");
const VirtualNode_1 = require("./VirtualNode");
const ComponentNode_1 = require("./ComponentNode");
const Fragment_1 = require("./Fragment");
const Diff_1 = require("../util/Diff");
const CascadeError_1 = require("../util/CascadeError");
var componentContext = window['$_cascade_component_context'] || {};
window['$_cascade_component_context'] = componentContext;
componentContext.componentContexts = componentContext.componentContexts || [];
componentContext.context = componentContext.context || undefined;
class Component {
    constructor(props, children) {
        this.uniqueId = Math.floor(Math.random() * 1000000);
        this.mounted = false;
        this.rendered = false;
        this.portal = false;
        this.storeProps(props, children);
    }
    storeProps(props, children) {
        this.prevProps = this.props;
        this.props = props || {};
        this.key = this.props.key;
        this.children = children;
        this.afterProps(this.mounted);
    }
    build() {
        this.oldContext = this.context;
        Component.pushContext();
        var root = this.render();
        this.context = Component.popContext();
        return root;
    }
    init() {
        Cascade_1.default.createComputed(this, 'root', () => {
            Cascade_1.default.wrapContext(() => {
                this.beforeRender(this.mounted);
            });
            return this.build();
        });
        Cascade_1.default.subscribe(this, 'root', (root, oldRoot) => {
            if (this.rendered) {
                var element = this.element;
                let namespace;
                if (element && element.nodeName !== 'svg') {
                    let namespaceURI = element.namespaceURI;
                    namespace = (namespaceURI && namespaceURI.endsWith('svg')) ? namespaceURI : undefined;
                }
                this.toNode(namespace, oldRoot);
                this.disposeContext();
                if (element !== this.element) {
                    if (element) {
                        var parentNode = element.parentNode;
                        if (parentNode) {
                            if (this.element) {
                                parentNode.replaceChild(this.element, element);
                            }
                            else {
                                parentNode.removeChild(element);
                            }
                        }
                    }
                }
            }
            else {
                this.rendered = true;
            }
        });
    }
    update(props, children) {
        this.storeProps(props, children);
        this.rendered = false;
        return Cascade_1.default.update(this, 'root');
    }
    toNode(namespace, oldRoot) {
        var root = Cascade_1.default.peek(this, 'root');
        var oldElement = this.element;
        var element;
        var rootType = typeof root;
        var noDispose = false;
        if (oldRoot && typeof oldRoot === rootType) {
            switch (rootType) {
                case 'string':
                    if (root !== oldRoot) {
                        element = document.createTextNode(root);
                    }
                    else {
                        element = oldElement;
                    }
                    break;
                case 'object':
                    if (root) {
                        if (root instanceof ComponentNode_1.default) {
                            if (root.componentConstructor === oldRoot.componentConstructor && root.key === oldRoot.key) {
                                if (oldRoot.component instanceof Fragment_1.default) {
                                    element = this.diffFragments(root, oldRoot, oldElement, namespace);
                                }
                                else {
                                    element = this.diffComponents(root, oldRoot, namespace);
                                    swapChildren(element, oldElement);
                                }
                                noDispose = true;
                            }
                            else {
                                element = root.toNode(namespace);
                            }
                        }
                        else if (root.type) {
                            if (root.type === oldRoot.type && root.key === oldRoot.key) {
                                root.element = oldElement;
                                element = this.diffVirtualNodes(root, oldRoot, oldElement, namespace);
                            }
                            else {
                                element = root.toNode(namespace);
                            }
                        }
                        else {
                            element = document.createTextNode(root.toString());
                        }
                    }
                    break;
                case 'undefined':
                    break;
                default:
                    if (root !== oldRoot) {
                        element = document.createTextNode(root.toString());
                    }
                    else {
                        element = oldElement;
                    }
                    break;
            }
        }
        else {
            switch (rootType) {
                case 'string':
                    element = document.createTextNode(root);
                    break;
                case 'object':
                    if (root) {
                        if (root.toNode) {
                            element = root.toNode(namespace);
                        }
                        else {
                            element = document.createTextNode(root.toString());
                        }
                    }
                    break;
                case 'undefined':
                    break;
                default:
                    element = document.createTextNode(root.toString());
                    break;
            }
        }
        if (this.props && this.props.ref) {
            if (typeof this.props.ref === 'function') {
                this.props.ref(element);
            }
            else {
                this.props.ref.current = element;
            }
        }
        if (!noDispose && oldRoot && oldRoot instanceof ComponentNode_1.default) {
        }
        this.afterRender(element, this.mounted);
        if (!element) {
            element = document.createComment('Empty Component');
        }
        this.element = element;
        this.rendered = true;
        this.mounted = true;
        if (this.portal) {
            element = document.createComment('Empty Component');
        }
        return element;
    }
    dispose() {
        var computed = Cascade_1.default.getObservable(this, 'root');
        computed.dispose();
        if (this.context) {
            for (var index = 0, length = this.context.length; index < length; index++) {
                let component = this.context[index];
                component.dispose();
            }
        }
        this.afterDispose(this.element);
    }
    disposeContext() {
        if (this.oldContext) {
            for (var index = 0, length = this.oldContext.length; index < length; index++) {
                let component = this.oldContext[index];
                component.dispose();
            }
        }
    }
    afterProps(updating) {
    }
    beforeRender(updating) {
    }
    afterRender(node, updating) {
    }
    afterDispose(node) {
    }
    diffFragments(newRootComponentNode, oldRootComponentNode, oldElement, namespace, offsetIndex = 0) {
        var output;
        let oldRoot = oldRootComponentNode.component;
        oldRootComponentNode.component = undefined;
        newRootComponentNode.component = oldRoot;
        oldRoot.update(newRootComponentNode.props, newRootComponentNode.children);
        this.diffVirtualNodes(oldRoot, oldRoot, oldElement, namespace, offsetIndex);
        return oldElement;
    }
    diffComponents(newRootComponentNode, oldRootComponentNode, namespace) {
        if (newRootComponentNode === oldRootComponentNode) {
            return oldRootComponentNode.component.element;
        }
        if (newRootComponentNode.component) {
            return newRootComponentNode.component.element;
        }
        var output;
        let oldRoot = oldRootComponentNode.component;
        if (!oldRoot) {
            throw new Error(CascadeError_1.CascadeError.NoOldComponent);
        }
        let oldElement = oldRoot.element;
        oldRootComponentNode.component = undefined;
        newRootComponentNode.component = oldRoot;
        let innerOldRoot = Cascade_1.default.peekDirty(oldRoot, 'root');
        let innerRoot = oldRoot.update(newRootComponentNode.props, newRootComponentNode.children);
        if (!innerOldRoot) {
            switch (typeof innerRoot) {
                case 'object':
                    if (innerRoot) {
                        if (innerRoot.toNode) {
                            output = innerRoot.toNode(namespace);
                        }
                        else {
                            output = document.createTextNode(innerRoot.toString());
                        }
                    }
                    break;
                case 'undefined':
                    break;
                default:
                    output = document.createTextNode(innerRoot.toString());
            }
        }
        else {
            switch (typeof innerRoot) {
                case 'object':
                    if (innerRoot) {
                        if (innerRoot instanceof ComponentNode_1.default) {
                            if (innerOldRoot instanceof ComponentNode_1.default && innerRoot.componentConstructor === innerOldRoot.componentConstructor && innerRoot.key === innerOldRoot.key) {
                                if (innerOldRoot.component instanceof Fragment_1.default) {
                                    output = this.diffFragments(innerRoot, innerOldRoot, oldElement, namespace);
                                }
                                else {
                                    output = this.diffComponents(innerRoot, innerOldRoot, namespace);
                                    swapChildren(output, oldElement);
                                }
                            }
                            else {
                                output = innerRoot.toNode(namespace);
                                innerOldRoot.dispose();
                            }
                        }
                        else if (innerRoot instanceof VirtualNode_1.default) {
                            if (innerOldRoot instanceof VirtualNode_1.default && innerRoot.type === innerOldRoot.type && innerRoot.key === innerOldRoot.key) {
                                output = this.diffVirtualNodes(innerRoot, innerOldRoot, oldElement, namespace);
                            }
                            else {
                                output = innerRoot.toNode(namespace);
                            }
                        }
                    }
                    break;
                case 'undefined':
                    break;
                case 'string':
                    if (innerRoot === innerOldRoot) {
                        output = oldElement;
                    }
                    else {
                        output = document.createTextNode(innerRoot);
                    }
                    break;
                default:
                    if (innerRoot === innerOldRoot) {
                        output = oldElement;
                    }
                    else {
                        output = document.createTextNode(innerRoot.toString());
                    }
            }
        }
        if (oldRoot.props.ref) {
            if (typeof oldRoot.props.ref === 'function') {
                oldRoot.props.ref(output);
            }
            else {
                oldRoot.props.ref.current = output;
            }
        }
        if (oldRoot.afterRender) {
            oldRoot.afterRender(output, true);
        }
        if (!output) {
            output = document.createComment('Empty Component');
        }
        oldRoot.element = output;
        if (oldRoot.portal) {
            output = document.createComment('Empty Component');
        }
        return output;
    }
    diffVirtualNodes(newRoot, oldRoot, oldElement, namespace, offsetIndex) {
        if (!oldRoot || oldRoot.type !== newRoot.type) {
            oldElement = newRoot.toNode(namespace);
        }
        else if (newRoot === oldRoot) {
        }
        else {
            var diff = Diff_1.default.compare(oldRoot.children, newRoot.children, compareVirtualNodes);
            var propertyDiff = Diff_1.default.compareHash(oldRoot.props, newRoot.props);
            namespace = namespace || ((oldElement && oldElement.namespaceURI && oldElement.namespaceURI.endsWith('svg')) ? oldElement.namespaceURI : undefined);
            var childIndex = oldRoot.children.length - 1 + (offsetIndex || 0);
            for (var index = 0, length = diff.length; index < length; index++) {
                var diffItem = diff[index];
                switch (diffItem.operation) {
                    case Diff_1.DiffOperation.REMOVE:
                        var oldChild = diffItem.item;
                        if (oldChild.component && oldChild.component.element.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                            let fragmentLength = oldChild.component.getChildLength();
                            let fragmentIndexLength = fragmentLength + childIndex;
                            for (let fragmentIndex = childIndex; fragmentIndex < fragmentIndexLength; fragmentIndex++) {
                                oldElement.removeChild(oldElement.childNodes[fragmentIndex]);
                            }
                            childIndex -= fragmentLength;
                        }
                        else {
                            oldElement.removeChild(oldElement.childNodes[childIndex]);
                            childIndex--;
                        }
                        break;
                    case Diff_1.DiffOperation.NONE:
                        var newChild = diffItem.itemB;
                        var oldChild = diffItem.item;
                        if (typeof newChild === 'object') {
                            if (newChild instanceof ComponentNode_1.default) {
                                if (oldChild.component instanceof Fragment_1.default) {
                                    this.diffVirtualNodes(newChild, oldChild, oldElement.childNodes[childIndex], namespace, childIndex);
                                }
                                else {
                                    let newNode = this.diffComponents(newChild, oldChild, namespace);
                                    swapChildren(newNode, oldElement.childNodes[childIndex], oldElement, childIndex);
                                }
                            }
                            else if (newChild instanceof VirtualNode_1.default) {
                                this.diffVirtualNodes(newChild, oldChild, oldElement.childNodes[childIndex], namespace);
                            }
                        }
                        childIndex--;
                        break;
                    case Diff_1.DiffOperation.ADD:
                        var newChild = diffItem.item;
                        var newElement;
                        switch (typeof newChild) {
                            case 'string':
                                newElement = document.createTextNode(newChild);
                                oldElement.insertBefore(newElement, oldElement.childNodes[childIndex + 1]);
                                break;
                            case 'object':
                                if (newChild) {
                                    if (newChild.toNode) {
                                        newElement = newChild.toNode(namespace);
                                    }
                                    else {
                                        newElement = document.createTextNode(newChild.toString());
                                    }
                                    oldElement.insertBefore(newElement, oldElement.childNodes[childIndex + 1]);
                                }
                                break;
                            default:
                                newElement = document.createTextNode(newChild.toString());
                                oldElement.insertBefore(newElement, oldElement.childNodes[childIndex + 1]);
                                break;
                        }
                        break;
                }
            }
            for (var name in propertyDiff) {
                if (propertyDiff.hasOwnProperty(name)) {
                    var property = propertyDiff[name];
                    if (property === null) {
                        VirtualNode_1.default.removeAttribute(oldElement, name, namespace);
                    }
                    else {
                        VirtualNode_1.default.setAttribute(oldElement, name, property, namespace);
                    }
                }
            }
            if (newRoot.props.ref) {
                if (typeof newRoot.props.ref === 'function') {
                    newRoot.props.ref(oldElement);
                }
                else {
                    newRoot.props.ref.current = oldElement;
                }
            }
        }
        return oldElement;
    }
    getChildLength() {
        let root = Cascade_1.default.peekDirty(this, 'root');
        if (root instanceof ComponentNode_1.default && root.component.getChildLength) {
            return root.component.getChildLength();
        }
        else {
            return 1;
        }
    }
    static getContext() {
        return componentContext.context;
    }
    static pushContext() {
        componentContext.context = [];
        componentContext.componentContexts.unshift(componentContext.context);
        return componentContext.context;
    }
    static popContext() {
        var oldContext = componentContext.componentContexts.shift();
        componentContext.context = componentContext.componentContexts[0];
        return oldContext;
    }
}
exports.Component = Component;
function compareVirtualNodes(nodeA, nodeB) {
    var typeA = typeof nodeA;
    var typeB = typeof nodeB;
    if (typeA === typeB) {
        switch (typeA) {
            case 'object':
                if (nodeA && nodeB && nodeA.toNode && nodeB.toNode) {
                    if (nodeA.key === nodeB.key) {
                        if (nodeA instanceof ComponentNode_1.default) {
                            return nodeA.componentConstructor === nodeB.componentConstructor;
                        }
                        else {
                            return nodeA.type === nodeB.type;
                        }
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return nodeA === nodeB;
                }
            default:
                return nodeA === nodeB;
        }
    }
    else {
        return false;
    }
}
function swapChildren(newNode, oldNode, parent, index) {
    if (newNode) {
        if (newNode !== oldNode) {
            if (oldNode && oldNode.parentNode) {
                oldNode.parentNode.replaceChild(newNode, oldNode);
            }
            else if (parent) {
                parent.insertBefore(newNode, parent.childNodes[index + 1]);
            }
        }
    }
    else {
        if (oldNode && oldNode.parentNode) {
            oldNode.parentNode.removeChild(oldNode);
        }
    }
}
//# sourceMappingURL=Component.js.map