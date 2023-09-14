Object.defineProperty(exports, "__esModule", { value: true });
const Cascade_1 = require("../modules/Cascade");
const Component_1 = require("./Component");
class Portal extends Component_1.Component {
    constructor() {
        super(...arguments);
        this.portal = true;
    }
    render() {
        return (Cascade_1.default.createElement("div", null, this.children));
    }
    afterRender(node, updated) {
        if (!this.props.element.contains(node)) {
            if (!this.props.remove) {
                this.props.element.appendChild(node);
            }
        }
        else {
            if (this.props.remove) {
                this.props.element.removeChild(node);
            }
        }
    }
    afterDispose(node) {
        if (this.props.element.contains(node)) {
            this.props.element.removeChild(node);
        }
    }
}
exports.default = Portal;
//# sourceMappingURL=Portal.js.map