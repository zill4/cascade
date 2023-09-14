Object.defineProperty(exports, "__esModule", { value: true });
const Cascade_1 = require("../cascade/Cascade");
const Component_1 = require("./Component");
describe('Component.toNode', () => {
    it('should render VirtualNodes', () => {
        class View extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement("div", null, "test");
            }
        }
        var root = (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement(View, null)));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        expect(container.childNodes[0].childNodes[0].textContent).toBe('test');
    });
    it('should render strings', () => {
        class View extends Component_1.Component {
            render() {
                return 'test';
            }
        }
        var root = (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement(View, null)));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        expect(container.childNodes[0].childNodes[0].data).toBe('test');
    });
    it('should render numbers', () => {
        class View extends Component_1.Component {
            render() {
                return 0;
            }
        }
        var root = (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement(View, null)));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        expect(container.childNodes[0].childNodes[0].data).toBe('0');
    });
    it('should render true', () => {
        class View extends Component_1.Component {
            render() {
                return true;
            }
        }
        var root = (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement(View, null)));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        expect(container.childNodes[0].childNodes[0].data).toBe('true');
    });
    it('should render false', () => {
        class View extends Component_1.Component {
            render() {
                return false;
            }
        }
        var root = (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement(View, null)));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        expect(container.childNodes[0].childNodes[0].data).toBe('false');
    });
    it('should render arrays', () => {
        class View extends Component_1.Component {
            render() {
                return [1, 2, 3];
            }
        }
        var root = (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement(View, null)));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        expect(container.childNodes[0].childNodes[0].data).toBe('1,2,3');
    });
    it('should render objects', () => {
        class View extends Component_1.Component {
            render() {
                return {
                    toString: function () {
                        return 'a, b, c';
                    },
                };
            }
        }
        var root = (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement(View, null)));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        expect(container.childNodes[0].childNodes[0].data).toBe('a, b, c');
    });
    it('should not render undefined', () => {
        class View extends Component_1.Component {
            render() {
                return undefined;
            }
        }
        var root = (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement(View, null)));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        expect(container.childNodes[0].childNodes[0].nodeType).toBe(Node.COMMENT_NODE);
    });
    it('should not render null', () => {
        class View extends Component_1.Component {
            render() {
                return null;
            }
        }
        var root = (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement(View, null)));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        expect(container.childNodes[0].childNodes[0].nodeType).toBe(Node.COMMENT_NODE);
    });
    it('should render nested VirtualNodes', () => {
        class Content extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement("div", null, "test");
            }
        }
        class View extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement(Content, null);
            }
        }
        var root = (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement(View, null)));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        expect(container.childNodes[0].childNodes[0].textContent).toBe('test');
    });
    it('should render nested strings', () => {
        class Content extends Component_1.Component {
            render() {
                return 'test';
            }
        }
        class View extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement(Content, null);
            }
        }
        var root = (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement(View, null)));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        expect(container.childNodes[0].childNodes[0].data).toBe('test');
    });
    it('should render nested numbers', () => {
        class Content extends Component_1.Component {
            render() {
                return 0;
            }
        }
        class View extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement(Content, null);
            }
        }
        var root = (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement(View, null)));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        expect(container.childNodes[0].childNodes[0].data).toBe('0');
    });
    it('should render nested true', () => {
        class Content extends Component_1.Component {
            render() {
                return true;
            }
        }
        class View extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement(Content, null);
            }
        }
        var root = (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement(View, null)));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        expect(container.childNodes[0].childNodes[0].data).toBe('true');
    });
    it('should render nested false', () => {
        class Content extends Component_1.Component {
            render() {
                return false;
            }
        }
        class View extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement(Content, null);
            }
        }
        var root = (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement(View, null)));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        expect(container.childNodes[0].childNodes[0].data).toBe('false');
    });
    it('should render nested arrays', () => {
        class Content extends Component_1.Component {
            render() {
                return [1, 2, 3];
            }
        }
        class View extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement(Content, null);
            }
        }
        var root = (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement(View, null)));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        expect(container.childNodes[0].childNodes[0].data).toBe('1,2,3');
    });
    it('should render nested objects', () => {
        class Content extends Component_1.Component {
            render() {
                return {
                    test: 'test',
                    toString: function () {
                        return 'a, b, c';
                    },
                };
            }
        }
        class View extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement(Content, null);
            }
        }
        var root = (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement(View, null)));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        expect(container.childNodes[0].childNodes[0].data).toBe('a, b, c');
    });
    it('should not render nested null', () => {
        class Content extends Component_1.Component {
            render() {
                return null;
            }
        }
        class View extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement(Content, null);
            }
        }
        var root = (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement(View, null)));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        expect(container.childNodes[0].childNodes[0].nodeType).toBe(Node.COMMENT_NODE);
    });
    it('should not render nested undefined', () => {
        class Content extends Component_1.Component {
            render() {
                return undefined;
            }
        }
        class View extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement(Content, null);
            }
        }
        var root = (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement(View, null)));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        expect(container.childNodes[0].childNodes[0].nodeType).toBe(Node.COMMENT_NODE);
    });
});
//# sourceMappingURL=Component.toNode.test.js.map