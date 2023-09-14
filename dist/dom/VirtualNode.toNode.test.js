Object.defineProperty(exports, "__esModule", { value: true });
const Cascade_1 = require("../cascade/Cascade");
const Component_1 = require("./Component");
const VirtualNode_1 = require("./VirtualNode");
describe('VirtualNode.toNode', function () {
    it('should render a Node', function () {
        var root = new VirtualNode_1.default('div', {}, ['text']);
        var node = root.toNode();
        expect(node.textContent).toBe('text');
    });
    it('should render recursively', function () {
        var root = new VirtualNode_1.default('div', { id: 'parent' }, [
            new VirtualNode_1.default('span', { id: 'child' }, []),
        ]);
        var node = root.toNode();
        var child = node.querySelector('#child');
        expect(!!child).toBe(true);
    });
    it('should render with JSX', function () {
        var root = (Cascade_1.default.createElement("div", { id: "parent" },
            Cascade_1.default.createElement("span", { id: "child" }, "text")));
        let element = Cascade_1.default.render(document.createElement('div'), root);
        var child = element.querySelector('#child');
        expect(!!child).toBe(true);
    });
    it('should not render undefined values', () => {
        var root = Cascade_1.default.createElement("div", { id: "parent" });
        let element = Cascade_1.default.render(document.createElement('div'), root);
        expect(element.childNodes.length).toBe(0);
    });
    it('should not render null values', () => {
        var root = Cascade_1.default.createElement("div", { id: "parent" }, null);
        let element = Cascade_1.default.render(document.createElement('div'), root);
        expect(element.childNodes.length).toBe(0);
    });
    it('should render falsy values', () => {
        var root = Cascade_1.default.createElement("div", { id: "parent" }, 0);
        let element = Cascade_1.default.render(document.createElement('div'), root);
        expect(element.childNodes[0].data).toBe('0');
    });
    it('should render Object.toString for Object values', () => {
        var object = {
            toString: function () {
                return 'String output';
            },
        };
        var root = Cascade_1.default.createElement("div", { id: "parent" }, object);
        let element = Cascade_1.default.render(document.createElement('div'), root);
        expect(element.childNodes[0].data).toBe('String output');
    });
    it('should render standard attributes', () => {
        var root = Cascade_1.default.createElement("div", { id: "testId" });
        let element = Cascade_1.default.render(document.createElement('div'), root);
        expect(element.id).toBe('testId');
    });
    it('should not render undefined attributes', () => {
        var root = Cascade_1.default.createElement("div", { id: undefined });
        let element = Cascade_1.default.render(document.createElement('div'), root);
        expect(element.id).not.toBe('undefined');
    });
    it('should not render null attributes', () => {
        var root = Cascade_1.default.createElement("div", { id: null });
        let element = Cascade_1.default.render(document.createElement('div'), root);
        expect(element.id).not.toBe('null');
    });
    it('should render form attributes', () => {
        var root = (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement("form", { id: "formId" }),
            Cascade_1.default.createElement("input", { form: "formId" })));
        let element = Cascade_1.default.render(document.createElement('div'), root);
        expect(element.childNodes[1].getAttribute('form')).toBe('formId');
    });
    it('should render custom attributes', () => {
        var root = Cascade_1.default.createElement("div", { "data-custom": "test value" });
        let element = Cascade_1.default.render(document.createElement('div'), root);
        expect(element.getAttribute('data-custom')).toBe('test value');
    });
    it('should render role attributes', () => {
        var root = Cascade_1.default.createElement("div", { role: "button" });
        let element = Cascade_1.default.render(document.createElement('div'), root);
        expect(element.getAttribute('role')).toBe('button');
    });
    it('should render aria attributes', () => {
        var root = Cascade_1.default.createElement("div", { "aria-label": "test value" });
        let element = Cascade_1.default.render(document.createElement('div'), root);
        expect(element.getAttribute('aria-label')).toBe('test value');
    });
    it('should render style attribute objects', () => {
        var root = Cascade_1.default.createElement("div", { style: { width: '100%' } });
        let element = Cascade_1.default.render(document.createElement('div'), root);
        expect(element.style.width).toBe('100%');
    });
    it('should ignore undefined and null properties of style attribute objects', () => {
        var root = (Cascade_1.default.createElement("div", { style: {
                '--test-0': undefined,
                '--test-1': null,
            } }));
        let element = Cascade_1.default.render(document.createElement('div'), root);
        expect(element.style.getPropertyValue('--test-0')).toBe('');
        expect(element.style.getPropertyValue('--test-1')).toBe('');
    });
    it('should render style attribute strings', () => {
        var root = Cascade_1.default.createElement("div", { style: "width: 100%" });
        let element = Cascade_1.default.render(document.createElement('div'), root);
        expect(element.style.width).toBe('100%');
    });
    it('should render event attributes with function references', () => {
        let count = 0;
        var root = (Cascade_1.default.createElement("button", { onclick: () => {
                count++;
            } }, "OK"));
        let element = Cascade_1.default.render(document.createElement('div'), root);
        element.click();
        expect(count).toBe(1);
    });
    it('should render SVG elements', function () {
        if (typeof SVGElement === 'undefined')
            this.skip();
        var root = (Cascade_1.default.createElement("svg", { height: "210", width: "400", xmlns: "http://www.w3.org/2000/svg" },
            Cascade_1.default.createElement("path", { d: "M 150 0 L 75 200 L 225 200 Z" }),
            "Sorry, your browser does not support inline SVG."));
        let element = Cascade_1.default.render(document.createElement('div'), root);
        let path = element.childNodes[0];
        expect(path.getAttribute('d')).toBe('M 150 0 L 75 200 L 225 200 Z');
    });
    it('should render Components', function () {
        class CustomComponent extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement("div", { id: this.props.id },
                    "Custom Component - ",
                    this.props.info);
            }
        }
        var root = (Cascade_1.default.createElement("div", { id: "parent" },
            Cascade_1.default.createElement(CustomComponent, { id: "child", info: "test" }, "text")));
        let element = Cascade_1.default.render(document.createElement('div'), root);
        var child = element.querySelector('#child');
        expect(child.textContent).toBe('Custom Component - test');
    });
    it('should render children before attributes', async () => {
        var root = (Cascade_1.default.createElement("select", { id: "select", value: "2" },
            Cascade_1.default.createElement("option", { value: "1" }, "1"),
            Cascade_1.default.createElement("option", { value: "2" }, "2")));
        let select = Cascade_1.default.render(document.createElement('div'), root);
        expect(select.value).toBe('2');
    });
});
//# sourceMappingURL=VirtualNode.toNode.test.js.map