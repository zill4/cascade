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
const Cascade_1 = require("../cascade/Cascade");
const Decorators_1 = require("../cascade/Decorators");
const Component_1 = require("./Component");
describe('Component.diff Nested Children', () => {
    it('should update around injected children', async () => {
        class ViewModel {
            constructor() {
                this.reverse = false;
                this.value = false;
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Boolean)
        ], ViewModel.prototype, "reverse", void 0);
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Boolean)
        ], ViewModel.prototype, "value", void 0);
        let parentCount = 0;
        let parentRenderCount = 0;
        let childCount = 0;
        let childRenderCount = 0;
        let injectedChildCount = 0;
        let injectedChildRenderCount = 0;
        class Parent extends Component_1.Component {
            constructor(props, children) {
                super(props, children);
                parentCount++;
            }
            render() {
                parentRenderCount++;
                let { viewModel } = this.props;
                return (Cascade_1.default.createElement("div", null,
                    Cascade_1.default.createElement(Child, { viewModel: viewModel },
                        Cascade_1.default.createElement(InjectedChild, { viewModel: viewModel }, "1"),
                        Cascade_1.default.createElement(InjectedChild, { viewModel: viewModel }, "2"))));
            }
        }
        class Child extends Component_1.Component {
            constructor(props, children) {
                super(props, children);
                childCount++;
            }
            render() {
                childRenderCount++;
                let { viewModel } = this.props;
                let children = this.children.map((child) => Cascade_1.default.createElement("li", null, child));
                if (viewModel.reverse) {
                    children.reverse();
                }
                return Cascade_1.default.createElement("ul", null, children);
            }
        }
        class InjectedChild extends Component_1.Component {
            constructor(props, children) {
                super(props, children);
                injectedChildCount++;
            }
            render() {
                injectedChildRenderCount++;
                return Cascade_1.default.createElement("span", null, this.children);
            }
        }
        let viewModel = new ViewModel();
        var root = Cascade_1.default.createElement(Parent, { viewModel: viewModel });
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        expect(container.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0]
            .textContent).toBe('1');
        viewModel.reverse = true;
        await Cascade_1.default.track(viewModel, 'reverse');
        expect(container.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0]
            .textContent).toBe('2');
        viewModel.value = true;
        await Cascade_1.default.track(viewModel, 'value');
        expect(container.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0]
            .textContent).toBe('2');
        expect(parentCount).toBe(1);
        expect(parentRenderCount).toBe(1);
        expect(childCount).toBe(1);
        expect(childRenderCount).toBe(2);
        expect(injectedChildCount).toBe(2);
        expect(injectedChildRenderCount).toBe(2);
    });
    it('should update around wrapped injected children', async () => {
        class ViewModel {
            constructor() {
                this.columns = 3;
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Number)
        ], ViewModel.prototype, "columns", void 0);
        class View extends Component_1.Component {
            render() {
                let { viewModel } = this.props;
                return (Cascade_1.default.createElement(Parent, { viewModel: viewModel },
                    Cascade_1.default.createElement(Child, { viewModel: viewModel, key: "child_0" }),
                    Cascade_1.default.createElement(Child, { viewModel: viewModel, key: "child_1" }),
                    Cascade_1.default.createElement(Child, { viewModel: viewModel, key: "child_2" }),
                    Cascade_1.default.createElement(Child, { viewModel: viewModel, key: "child_3" }),
                    Cascade_1.default.createElement(Child, { viewModel: viewModel, key: "child_4" }),
                    Cascade_1.default.createElement(Child, { viewModel: viewModel, key: "child_5" })));
            }
        }
        class Parent extends Component_1.Component {
            render() {
                let { viewModel } = this.props;
                let wrappedChildren = [];
                let innerWrapper;
                let columns = viewModel.columns;
                this.children.forEach((child, index) => {
                    if (index % columns === 0) {
                        innerWrapper = [];
                        wrappedChildren.push(innerWrapper);
                    }
                    innerWrapper.push(child);
                });
                return (Cascade_1.default.createElement("div", null, wrappedChildren.map((children, index) => {
                    return (Cascade_1.default.createElement(Wrapper, { viewModel: viewModel, key: index }, children));
                })));
            }
        }
        class Container extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement("ul", null, this.children);
            }
        }
        class Wrapper extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement("li", null, this.children);
            }
        }
        class Child extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement("span", null, this.children);
            }
        }
        let viewModel = new ViewModel();
        var root = Cascade_1.default.createElement(View, { viewModel: viewModel });
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        expect(container.childNodes[0].childNodes.length).toBe(2);
        expect(container.childNodes[0].childNodes[0].childNodes.length).toBe(3);
        expect(container.childNodes[0].childNodes[1].childNodes.length).toBe(3);
        viewModel.columns = 2;
        await Cascade_1.default.track(viewModel, 'columns');
        expect(container.childNodes[0].childNodes.length).toBe(3);
        expect(container.childNodes[0].childNodes[0].childNodes.length).toBe(2);
        expect(container.childNodes[0].childNodes[1].childNodes.length).toBe(2);
    });
});
//# sourceMappingURL=Component.diff_Nested_Children.test.js.map