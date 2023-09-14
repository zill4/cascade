Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
const Fragment_1 = require("./Fragment");
class ComponentNode {
    constructor(componentConstructor, props, children) {
        this.componentConstructor = componentConstructor;
        this.props = props || {};
        this.key = this.props.key;
        this.children = children;
        let context = Component_1.Component.getContext();
        if (context) {
            context.push(this);
        }
    }
    toComponent() {
        this.component = new this.componentConstructor(this.props, this.children);
        if (!(this.component instanceof Fragment_1.default)) {
            this.component.init();
        }
        return this.component;
    }
    toNode(namespace) {
        if (!this.component) {
            this.toComponent();
        }
        return this.component.toNode(namespace);
    }
    dispose() {
        if (this.component) {
            this.component.dispose();
        }
    }
}
exports.default = ComponentNode;
//# sourceMappingURL=ComponentNode.js.map