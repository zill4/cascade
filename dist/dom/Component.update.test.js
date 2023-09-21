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
const PromiseUtil_1 = require("../util/PromiseUtil");
const Component_1 = require("./Component");
describe('Component.update', () => {
    it('should store old props in Component.prevProps', async () => {
        class ViewModel {
            constructor() {
                this.value = false;
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Boolean)
        ], ViewModel.prototype, "value", void 0);
        class View extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement(Child, { value: this.props.viewModel.value });
            }
        }
        let runCount = 0;
        class Child extends Component_1.Component {
            render() {
                switch (runCount) {
                    case 0:
                        expect(this.prevProps).toBeUndefined();
                        expect(this.props.value).toBe(false);
                        break;
                    case 1:
                        expect(this.prevProps.value).toBe(false);
                        expect(this.props.value).toBe(true);
                        break;
                }
                runCount++;
                return Cascade_1.default.createElement("div", null, this.props.value);
            }
        }
        let viewModel = new ViewModel();
        let container = document.createElement('div');
        Cascade_1.default.render(container, Cascade_1.default.createElement(View, { viewModel: viewModel }));
        viewModel.value = true;
        await (0, PromiseUtil_1.wait)(20);
        expect(runCount).toBe(2);
    });
    it('should update from inherited observables', async () => {
        class Parent {
            constructor() {
                this.parentValue = 0;
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Number)
        ], Parent.prototype, "parentValue", void 0);
        class Child extends Parent {
            constructor() {
                super(...arguments);
                this.childValue = 10;
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Number)
        ], Child.prototype, "childValue", void 0);
        class View extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement("div", null, this.props.child.parentValue);
            }
        }
        var child = new Child();
        var root = (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement(View, { child: child })));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        child.parentValue = 1;
        await (0, PromiseUtil_1.wait)(20);
        expect(container.childNodes[0].childNodes[0].textContent).toBe('1');
    });
    it('should update from inherited abstract observables', async () => {
        class Parent {
            constructor() {
                this.parentValue = 0;
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Number)
        ], Parent.prototype, "parentValue", void 0);
        class Child extends Parent {
            constructor() {
                super(...arguments);
                this.childValue = 10;
            }
            init() { }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Number)
        ], Child.prototype, "childValue", void 0);
        class View extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement("div", null, this.props.child.parentValue);
            }
        }
        var child = new Child();
        var root = (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement(View, { child: child })));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        child.parentValue = 1;
        await (0, PromiseUtil_1.wait)(20);
        expect(container.childNodes[0].childNodes[0].textContent).toBe('1');
    });
    it('should update nested Components', async () => {
        class ViewModel {
            constructor() {
                this.valueA = 'value A';
                this.valueB = 'value B';
                this.valueC = 'value C';
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", String)
        ], ViewModel.prototype, "valueA", void 0);
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", String)
        ], ViewModel.prototype, "valueB", void 0);
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", String)
        ], ViewModel.prototype, "valueC", void 0);
        class View extends Component_1.Component {
            render() {
                let { viewModel } = this.props;
                return (Cascade_1.default.createElement("div", { key: "view" },
                    Cascade_1.default.createElement(Parent, { viewModel: viewModel }),
                    Cascade_1.default.createElement("div", null, viewModel.valueA)));
            }
        }
        class Parent extends Component_1.Component {
            render() {
                let { viewModel } = this.props;
                return (Cascade_1.default.createElement("div", { key: "parent" },
                    Cascade_1.default.createElement(Child, { viewModel: viewModel }),
                    Cascade_1.default.createElement("div", null, viewModel.valueB)));
            }
        }
        let childRenderCount = 0;
        class Child extends Component_1.Component {
            render() {
                childRenderCount++;
                let { viewModel } = this.props;
                return Cascade_1.default.createElement("div", { key: "child" }, viewModel.valueC);
            }
        }
        let viewModel = new ViewModel();
        var root = (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement(View, { viewModel: viewModel })));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        await (0, PromiseUtil_1.wait)(0);
        viewModel.valueA = 'new value A';
        await (0, PromiseUtil_1.wait)(0);
        viewModel.valueB = 'new value B';
        await (0, PromiseUtil_1.wait)(0);
        viewModel.valueC = 'new value C';
        await (0, PromiseUtil_1.wait)(20);
        expect(container.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes.length).toBe(1);
        expect(container.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0]
            .textContent).toBe('new value C');
        expect(childRenderCount).toBe(4);
    });
    it('should call afterProps on storeProps', async () => {
        class ViewModel {
            constructor() {
                this.valueA = 'value A';
                this.valueB = 'value B';
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", String)
        ], ViewModel.prototype, "valueA", void 0);
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", String)
        ], ViewModel.prototype, "valueB", void 0);
        class View extends Component_1.Component {
            render() {
                let { viewModel } = this.props;
                return (Cascade_1.default.createElement("div", { key: "view" },
                    Cascade_1.default.createElement(Parent, { viewModel: viewModel }),
                    Cascade_1.default.createElement("div", null, viewModel.valueA)));
            }
        }
        class Parent extends Component_1.Component {
            render() {
                let { viewModel } = this.props;
                return (Cascade_1.default.createElement("div", { key: "parent" },
                    Cascade_1.default.createElement(Child, { viewModel: viewModel }),
                    Cascade_1.default.createElement("div", null, viewModel.valueB)));
            }
        }
        let childRenderCount = 0;
        let childAfterPropsCount = 0;
        class Child extends Component_1.Component {
            constructor() {
                super(...arguments);
                this.valueC = 'value C';
            }
            beforeRender(mounted) {
                if (!mounted) {
                    window.setTimeout(() => {
                        this.valueC = 'new value C';
                    });
                }
            }
            afterProps() {
                childAfterPropsCount++;
            }
            render() {
                childRenderCount++;
                return Cascade_1.default.createElement("div", { key: "child" }, this.valueC);
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", String)
        ], Child.prototype, "valueC", void 0);
        let viewModel = new ViewModel();
        var root = (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement(View, { viewModel: viewModel })));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        await (0, PromiseUtil_1.wait)(0);
        viewModel.valueA = 'new value A';
        await (0, PromiseUtil_1.wait)(0);
        viewModel.valueB = 'new value B';
        await (0, PromiseUtil_1.wait)(20);
        expect(container.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes.length).toBe(1);
        expect(container.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0]
            .textContent).toBe('new value C');
        expect(childRenderCount).toBe(4);
        expect(childAfterPropsCount).toBe(3);
    });
    it('should update children before attributes', async () => {
        class ViewModel {
            constructor() {
                this.options = [1, 2, 3];
                this.value = 2;
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Array)
        ], ViewModel.prototype, "options", void 0);
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Number)
        ], ViewModel.prototype, "value", void 0);
        class View extends Component_1.Component {
            render() {
                let { viewModel } = this.props;
                return (Cascade_1.default.createElement("select", { id: "select", value: viewModel.value }, viewModel.options.map((option) => (Cascade_1.default.createElement("option", { value: option }, option)))));
            }
        }
        let viewModel = new ViewModel();
        let root = Cascade_1.default.createElement(View, { viewModel: viewModel });
        let select = Cascade_1.default.render(document.createElement('div'), root);
        expect(select.value).toBe('2');
        viewModel.options.push(4);
        viewModel.value = 4;
        await (0, PromiseUtil_1.wait)(20);
        expect(select.value).toBe('4');
    });
});
//# sourceMappingURL=Component.update.test.js.map