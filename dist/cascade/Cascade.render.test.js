var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cascade_1 = require("./Cascade");
const PromiseUtil_1 = require("../util/PromiseUtil");
const Component_1 = require("../dom/Component");
const Ref_1 = require("../dom/Ref");
const Decorators_1 = require("./Decorators");
describe('Cascade', function () {
    describe('render', function () {
        it('should render VirtualNodes', function () {
            class View extends Component_1.Component {
                render() {
                    return Cascade_1.default.createElement("div", null, "test");
                }
            }
            var container = document.createElement('div');
            Cascade_1.default.render(container, Cascade_1.default.createElement(View, null));
            expect(container.childNodes[0].textContent).toBe('test');
        });
        it('should render strings', function () {
            class View extends Component_1.Component {
                render() {
                    return 'test';
                }
            }
            var container = document.createElement('div');
            Cascade_1.default.render(container, Cascade_1.default.createElement(View, null));
            expect(container.childNodes[0].data).toBe('test');
        });
        it('should render numbers', function () {
            class View extends Component_1.Component {
                render() {
                    return 0;
                }
            }
            var container = document.createElement('div');
            Cascade_1.default.render(container, Cascade_1.default.createElement(View, null));
            expect(container.childNodes[0].data).toBe('0');
        });
        it('should render true', function () {
            class View extends Component_1.Component {
                render() {
                    return true;
                }
            }
            var container = document.createElement('div');
            Cascade_1.default.render(container, Cascade_1.default.createElement(View, null));
            expect(container.childNodes[0].data).toBe('true');
        });
        it('should render false', function () {
            class View extends Component_1.Component {
                render() {
                    return false;
                }
            }
            var container = document.createElement('div');
            Cascade_1.default.render(container, Cascade_1.default.createElement(View, null));
            expect(container.childNodes[0].data).toBe('false');
        });
        it('should render arrays', function () {
            class View extends Component_1.Component {
                render() {
                    return [1, 2, 3];
                }
            }
            var container = document.createElement('div');
            Cascade_1.default.render(container, Cascade_1.default.createElement(View, null));
            expect(container.childNodes[0].data).toBe('1,2,3');
        });
        it('should render objects', function () {
            class View extends Component_1.Component {
                render() {
                    return {
                        toString: function () {
                            return 'a, b, c';
                        },
                    };
                }
            }
            var container = document.createElement('div');
            Cascade_1.default.render(container, Cascade_1.default.createElement(View, null));
            expect(container.childNodes[0].data).toBe('a, b, c');
        });
        it('should not render undefined', function () {
            class View extends Component_1.Component {
                render() {
                    return undefined;
                }
            }
            var container = document.createElement('div');
            Cascade_1.default.render(container, Cascade_1.default.createElement(View, null));
            expect(container.childNodes[0].nodeType).toBe(Node.COMMENT_NODE);
        });
        it('should not render null', function () {
            class View extends Component_1.Component {
                render() {
                    return null;
                }
            }
            var container = document.createElement('div');
            Cascade_1.default.render(container, Cascade_1.default.createElement(View, null));
            expect(container.childNodes[0].nodeType).toBe(Node.COMMENT_NODE);
        });
        it('should render nested VirtualNodes', function () {
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
            var container = document.createElement('div');
            Cascade_1.default.render(container, Cascade_1.default.createElement(View, null));
            expect(container.childNodes[0].textContent).toBe('test');
        });
        it('should render nested strings', function () {
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
            var container = document.createElement('div');
            Cascade_1.default.render(container, Cascade_1.default.createElement(View, null));
            expect(container.childNodes[0].data).toBe('test');
        });
        it('should render nested numbers', function () {
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
            var container = document.createElement('div');
            Cascade_1.default.render(container, Cascade_1.default.createElement(View, null));
            expect(container.childNodes[0].data).toBe('0');
        });
        it('should render nested true', function () {
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
            var container = document.createElement('div');
            Cascade_1.default.render(container, Cascade_1.default.createElement(View, null));
            expect(container.childNodes[0].data).toBe('true');
        });
        it('should render nested false', function () {
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
            var container = document.createElement('div');
            Cascade_1.default.render(container, Cascade_1.default.createElement(View, null));
            expect(container.childNodes[0].data).toBe('false');
        });
        it('should render nested arrays', function () {
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
            var container = document.createElement('div');
            Cascade_1.default.render(container, Cascade_1.default.createElement(View, null));
            expect(container.childNodes[0].data).toBe('1,2,3');
        });
        it('should render nested objects', function () {
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
            var container = document.createElement('div');
            Cascade_1.default.render(container, Cascade_1.default.createElement(View, null));
            expect(container.childNodes[0].data).toBe('a, b, c');
        });
        it('should not render nested null', function () {
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
            var container = document.createElement('div');
            Cascade_1.default.render(container, Cascade_1.default.createElement(View, null));
            expect(container.childNodes[0].nodeType).toBe(Node.COMMENT_NODE);
        });
        it('should not render nested undefined', function () {
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
            var container = document.createElement('div');
            Cascade_1.default.render(container, Cascade_1.default.createElement(View, null));
            expect(container.childNodes[0].nodeType).toBe(Node.COMMENT_NODE);
        });
        it('should use beforeRender', async function () {
            class ViewModel {
                constructor() {
                    this.value = false;
                }
            }
            __decorate([
                Decorators_1.observable,
                __metadata("design:type", Boolean)
            ], ViewModel.prototype, "value", void 0);
            let beforeRenderCount = 0;
            class View extends Component_1.Component {
                beforeRender() {
                    beforeRenderCount++;
                }
                render() {
                    let { viewModel } = this.props;
                    return Cascade_1.default.createElement("div", null, viewModel.value);
                }
            }
            var container = document.createElement('div');
            var viewModel = new ViewModel();
            Cascade_1.default.render(container, Cascade_1.default.createElement(View, { viewModel: viewModel }));
            await (0, PromiseUtil_1.wait)(0);
            viewModel.value = true;
            await (0, PromiseUtil_1.wait)(0);
            expect(beforeRenderCount).toBe(2);
        });
        it('should use afterRender and callback ref', function () {
            class ViewModel {
                constructor() {
                    this.parentRef = (node) => {
                        this.parentNode = node;
                    };
                    this.childRef = (node) => {
                        this.childNode = node;
                    };
                }
            }
            class Parent extends Component_1.Component {
                afterRender(node) {
                    viewModel.afterRenderNode = node;
                }
                render() {
                    let { viewModel } = this.props;
                    return (Cascade_1.default.createElement("div", null,
                        Cascade_1.default.createElement("span", { ref: viewModel.childRef }, "Text")));
                }
            }
            var viewModel = new ViewModel();
            var container = document.createElement('div');
            var root = (Cascade_1.default.createElement("div", null,
                Cascade_1.default.createElement(Parent, { viewModel: viewModel, ref: viewModel.parentRef })));
            Cascade_1.default.render(container, root);
            expect(viewModel.afterRenderNode.tagName).toBe('DIV');
            expect(viewModel.parentNode.tagName).toBe('DIV');
            expect(viewModel.childNode.tagName).toBe('SPAN');
        });
        it('should use afterRender and callback ref after update', async function () {
            class ViewModel {
                constructor() {
                    this.value = 1;
                    this.parentRef = (node) => {
                        this.parentNode = node;
                    };
                    this.childRef = (node) => {
                        this.childNode = node;
                    };
                }
            }
            __decorate([
                Decorators_1.observable,
                __metadata("design:type", Object)
            ], ViewModel.prototype, "value", void 0);
            class Parent extends Component_1.Component {
                afterRender(node) {
                    viewModel.afterRenderNode = node;
                }
                render() {
                    let { viewModel } = this.props;
                    return (Cascade_1.default.createElement("div", null,
                        Cascade_1.default.createElement("span", { ref: viewModel.childRef }, "Text"),
                        Cascade_1.default.createElement("span", null, viewModel.value)));
                }
            }
            var viewModel = new ViewModel();
            var container = document.createElement('div');
            var root = (Cascade_1.default.createElement("div", null,
                Cascade_1.default.createElement(Parent, { viewModel: viewModel, ref: viewModel.parentRef })));
            Cascade_1.default.render(container, root);
            viewModel.afterRenderNode = undefined;
            viewModel.parentNode = undefined;
            viewModel.childNode = undefined;
            viewModel.value = 2;
            await (0, PromiseUtil_1.wait)(20);
            expect(viewModel.afterRenderNode.tagName).toBe('DIV');
            expect(viewModel.parentNode.tagName).toBe('DIV');
            expect(viewModel.childNode.tagName).toBe('SPAN');
        });
        it('should use afterRender and ref', function () {
            class ViewModel {
                constructor() {
                    this.parentRef = new Ref_1.default();
                    this.childRef = new Ref_1.default();
                }
            }
            class Parent extends Component_1.Component {
                afterRender(node) {
                    viewModel.afterRenderNode = node;
                }
                render() {
                    let { viewModel } = this.props;
                    return (Cascade_1.default.createElement("div", null,
                        Cascade_1.default.createElement("span", { ref: viewModel.childRef }, "Text")));
                }
            }
            var viewModel = new ViewModel();
            var container = document.createElement('div');
            var root = (Cascade_1.default.createElement("div", null,
                Cascade_1.default.createElement(Parent, { viewModel: viewModel, ref: viewModel.parentRef })));
            Cascade_1.default.render(container, root);
            expect(viewModel.afterRenderNode.tagName).toBe('DIV');
            expect(viewModel.parentRef.current.tagName).toBe('DIV');
            expect(viewModel.childRef.current.tagName).toBe('SPAN');
        });
        it('should use afterRender and ref after update', async function () {
            class ViewModel {
                constructor() {
                    this.value = 1;
                    this.parentRef = new Ref_1.default();
                    this.childRef = new Ref_1.default();
                }
            }
            __decorate([
                Decorators_1.observable,
                __metadata("design:type", Object)
            ], ViewModel.prototype, "value", void 0);
            class Parent extends Component_1.Component {
                afterRender(node) {
                    viewModel.afterRenderNode = node;
                }
                render() {
                    let { viewModel } = this.props;
                    return (Cascade_1.default.createElement("div", null,
                        Cascade_1.default.createElement("span", { ref: viewModel.childRef }, "Text"),
                        Cascade_1.default.createElement("span", null, viewModel.value)));
                }
            }
            var viewModel = new ViewModel();
            var container = document.createElement('div');
            var root = (Cascade_1.default.createElement("div", null,
                Cascade_1.default.createElement(Parent, { viewModel: viewModel, ref: viewModel.parentRef })));
            Cascade_1.default.render(container, root);
            viewModel.afterRenderNode = undefined;
            viewModel.parentRef.current = undefined;
            viewModel.childRef.current = undefined;
            viewModel.value = 2;
            await (0, PromiseUtil_1.wait)(20);
            expect(viewModel.afterRenderNode.tagName).toBe('DIV');
            expect(viewModel.parentRef.current.tagName).toBe('DIV');
            expect(viewModel.childRef.current.tagName).toBe('SPAN');
        });
    });
});
//# sourceMappingURL=Cascade.render.test.js.map