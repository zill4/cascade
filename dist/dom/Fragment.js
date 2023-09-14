Object.defineProperty(exports, "__esModule", { value: true });
class Fragment {
    constructor(props, children) {
        this.storeProps(props, children);
    }
    storeProps(props, children) {
        this.props = props || {};
        this.key = this.props.key;
        this.children = children;
    }
    update(props, children) {
        this.storeProps(props, children);
    }
    toNode() {
        var node = document.createDocumentFragment();
        for (let index = 0, length = this.children.length; index < length; index++) {
            var child = this.children[index];
            switch (typeof child) {
                case 'string':
                    node.appendChild(document.createTextNode(child));
                    break;
                case 'object':
                    if (child) {
                        if (child.toNode) {
                            var renderedNode = child.toNode();
                            if (renderedNode instanceof Node) {
                                node.appendChild(renderedNode);
                            }
                        }
                        else {
                            node.appendChild(document.createTextNode(child.toString()));
                        }
                    }
                    break;
                case 'undefined':
                    break;
                default:
                    node.appendChild(document.createTextNode(child.toString()));
                    break;
            }
        }
        if (this.props && this.props.ref) {
            if (typeof this.props.ref === 'function') {
                this.props.ref(node);
            }
            else {
                this.props.ref.current = node;
            }
        }
        let elementArray = [];
        let childNodes = node.childNodes;
        for (let index = 0, length = childNodes.length; index < length; index++) {
            elementArray.push(childNodes[index]);
        }
        this.elementArray = elementArray;
        this.element = node;
        return node;
    }
    toString() {
        var container = document.createElement('div');
        container.appendChild(this.toNode());
        return container.innerHTML;
    }
    dispose() {
    }
    getChildLength() {
        let childLength = 0;
        for (let child of this.children) {
            if (child !== null && child !== undefined) {
                if (child.getChildLength) {
                    childLength += child.getChildLength();
                }
                else if (child.children) {
                    childLength += child.children.length;
                }
                else {
                    childLength++;
                }
            }
        }
        return childLength;
    }
}
exports.default = Fragment;
//# sourceMappingURL=Fragment.js.map