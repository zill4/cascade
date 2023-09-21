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
describe('Component.diff', () => {
    it.skip('should update nested roots', async () => {
        class ViewModel {
            constructor() {
                this.value = false;
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Object)
        ], ViewModel.prototype, "value", void 0);
        class Content extends Component_1.Component {
            render() {
                return this.props.viewModel.value ? null : true;
            }
        }
        class View extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement(Content, { viewModel: viewModel });
            }
        }
        var viewModel = new ViewModel();
        var container = document.createElement('div');
        Cascade_1.default.render(container, Cascade_1.default.createElement(View, { viewModel: viewModel }));
        viewModel.value = true;
        await (0, PromiseUtil_1.wait)(200);
        expect(container.textContent).toBe('');
    });
    it('should update nested roots', async () => {
        class ViewModel {
            constructor() {
                this.value = false;
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Object)
        ], ViewModel.prototype, "value", void 0);
        class Content extends Component_1.Component {
            render() {
                return this.props.viewModel.value ? true : null;
            }
        }
        class Container extends Component_1.Component {
            render() {
                return (Cascade_1.default.createElement("section", null,
                    Cascade_1.default.createElement("header", null, "Header"),
                    Cascade_1.default.createElement("div", null, this.children)));
            }
        }
        class View extends Component_1.Component {
            render() {
                return (Cascade_1.default.createElement(Container, null,
                    Cascade_1.default.createElement(Content, { viewModel: viewModel })));
            }
        }
        var viewModel = new ViewModel();
        var container = document.createElement('div');
        Cascade_1.default.render(container, Cascade_1.default.createElement(View, { viewModel: viewModel }));
        viewModel.value = true;
        await (0, PromiseUtil_1.wait)(20);
        expect(container.childNodes[0].childNodes[1].textContent).toBe('true');
    });
    it('should update empty nested Components', async () => {
        class ViewModel {
            constructor() {
                this.value = false;
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Object)
        ], ViewModel.prototype, "value", void 0);
        class Content extends Component_1.Component {
            render() {
                return this.props.value ? true : null;
            }
        }
        class View extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement(Content, { value: viewModel.value });
            }
        }
        var viewModel = new ViewModel();
        var root = (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement(View, { viewModel: viewModel })));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        let result = Cascade_1.default.set(viewModel, 'value', true);
        expect(container.childNodes[0].childNodes.length).toBe(1);
        expect(container.childNodes[0].childNodes[0].nodeType).toBe(Node.COMMENT_NODE);
        await result;
        expect(container.childNodes[0].childNodes.length).toBe(1);
        expect(container.childNodes[0].childNodes[0].nodeType).toBe(Node.TEXT_NODE);
        await Cascade_1.default.set(viewModel, 'value', false);
        expect(container.childNodes[0].childNodes.length).toBe(1);
        expect(container.childNodes[0].childNodes[0].nodeType).toBe(Node.COMMENT_NODE);
    });
    it('should update empty Components', async () => {
        class ViewModel {
            constructor() {
                this.value = false;
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Object)
        ], ViewModel.prototype, "value", void 0);
        class Content extends Component_1.Component {
            render() {
                return this.props.value ? true : null;
            }
        }
        class View extends Component_1.Component {
            render() {
                return (Cascade_1.default.createElement("div", null,
                    Cascade_1.default.createElement(Content, { value: viewModel.value })));
            }
        }
        var viewModel = new ViewModel();
        var root = (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement(View, { viewModel: viewModel })));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        let result = Cascade_1.default.set(viewModel, 'value', true);
        expect(container.childNodes[0].childNodes[0].childNodes.length).toBe(1);
        expect(container.childNodes[0].childNodes[0].childNodes[0].nodeType).toBe(Node.COMMENT_NODE);
        await result;
        expect(container.childNodes[0].childNodes[0].childNodes.length).toBe(1);
        expect(container.childNodes[0].childNodes[0].childNodes[0].nodeType).toBe(Node.TEXT_NODE);
        await Cascade_1.default.set(viewModel, 'value', false);
        expect(container.childNodes[0].childNodes[0].childNodes.length).toBe(1);
        expect(container.childNodes[0].childNodes[0].childNodes[0].nodeType).toBe(Node.COMMENT_NODE);
    });
    it('should delete null values', async () => {
        class ViewModel {
            constructor() {
                this.nonNull = 'nonNull';
                this.nonUndefined = 'nonUndefined';
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Object)
        ], ViewModel.prototype, "nonNull", void 0);
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Object)
        ], ViewModel.prototype, "nonUndefined", void 0);
        class View extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement("div", { className: viewModel.nonNull, id: viewModel.nonUndefined });
            }
        }
        var viewModel = new ViewModel();
        var root = (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement(View, { viewModel: viewModel })));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        viewModel.nonNull = null;
        viewModel.nonUndefined = undefined;
        await (0, PromiseUtil_1.wait)(20);
        let div = container.childNodes[0].childNodes[0];
        expect(div.className).not.toBe('nonNull');
        expect(div.id).not.toBe('nonUndefined');
        expect(div.className).not.toBe('null');
        expect(div.id).not.toBe('undefined');
    });
    it('should handle new child Components', async () => {
        class ViewModel {
            constructor() {
                this.visible = false;
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Boolean)
        ], ViewModel.prototype, "visible", void 0);
        class StaticChild extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement("div", { id: "static" }, "static child");
            }
        }
        class DynamicChild extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement("div", { id: "dynamic" }, "dynamic child");
            }
        }
        class Parent extends Component_1.Component {
            render() {
                let { viewModel } = this.props;
                return (Cascade_1.default.createElement("div", { id: "parent" },
                    Cascade_1.default.createElement(StaticChild, null),
                    viewModel.visible ? Cascade_1.default.createElement(DynamicChild, null) : undefined));
            }
        }
        var viewModel = new ViewModel();
        var root = (Cascade_1.default.createElement("div", { id: "root" },
            Cascade_1.default.createElement(Parent, { viewModel: viewModel })));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        await (0, PromiseUtil_1.wait)(0);
        viewModel.visible = true;
        await (0, PromiseUtil_1.wait)(20);
        let divRoot = container.childNodes[0];
        let divParent = divRoot.childNodes[0];
        let divStatic = divParent.childNodes[0];
        let divDynamic = divParent.childNodes[1];
        expect(divStatic).toBeDefined();
        expect(divDynamic).toBeDefined();
        if (divDynamic) {
            expect(divDynamic.id).toBe('dynamic');
        }
    });
    it('should handle change from null child Components', async () => {
        class ViewModel {
            constructor() {
                this.visible = false;
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Boolean)
        ], ViewModel.prototype, "visible", void 0);
        class StaticChild extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement("div", { id: "static" }, "static child");
            }
        }
        class DynamicChild extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement("div", { id: "dynamic" }, "dynamic child");
            }
        }
        class Parent extends Component_1.Component {
            render() {
                let { viewModel } = this.props;
                return (Cascade_1.default.createElement("div", { id: "parent" },
                    Cascade_1.default.createElement(StaticChild, null),
                    viewModel.visible ? Cascade_1.default.createElement(DynamicChild, null) : null));
            }
        }
        var viewModel = new ViewModel();
        var root = (Cascade_1.default.createElement("div", { id: "root" },
            Cascade_1.default.createElement(Parent, { viewModel: viewModel })));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        await (0, PromiseUtil_1.wait)(0);
        viewModel.visible = true;
        await (0, PromiseUtil_1.wait)(20);
        let divRoot = container.childNodes[0];
        let divParent = divRoot.childNodes[0];
        let divStatic = divParent.childNodes[0];
        let divDynamic = divParent.childNodes[1];
        expect(divStatic).toBeDefined();
        expect(divDynamic).toBeDefined();
        if (divDynamic) {
            expect(divDynamic.id).toBe('dynamic');
        }
    });
    it('should handle change to null child Components', async () => {
        class ViewModel {
            constructor() {
                this.visible = true;
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Boolean)
        ], ViewModel.prototype, "visible", void 0);
        class StaticChild extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement("div", { id: "static" }, "static child");
            }
        }
        class DynamicChild extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement("div", { id: "dynamic" }, "dynamic child");
            }
        }
        class Parent extends Component_1.Component {
            render() {
                let { viewModel } = this.props;
                return (Cascade_1.default.createElement("div", { id: "parent" },
                    Cascade_1.default.createElement(StaticChild, null),
                    viewModel.visible ? Cascade_1.default.createElement(DynamicChild, null) : null));
            }
        }
        var viewModel = new ViewModel();
        var root = (Cascade_1.default.createElement("div", { id: "root" },
            Cascade_1.default.createElement(Parent, { viewModel: viewModel })));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        await (0, PromiseUtil_1.wait)(0);
        viewModel.visible = false;
        await (0, PromiseUtil_1.wait)(20);
        let divRoot = container.childNodes[0];
        let divParent = divRoot.childNodes[0];
        let divStatic = divParent.childNodes[0];
        let divDynamic = divParent.childNodes[1];
        expect(divStatic).toBeDefined();
        expect(divDynamic).toBeUndefined();
    });
    it('should handle change null to null', async () => {
        class ViewModel {
            constructor() {
                this.visible = false;
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Boolean)
        ], ViewModel.prototype, "visible", void 0);
        class StaticChild extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement("div", { id: "static" }, "static child");
            }
        }
        class DynamicChild extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement("div", { id: "dynamic" }, "dynamic child");
            }
        }
        class Parent extends Component_1.Component {
            render() {
                let { viewModel } = this.props;
                return (Cascade_1.default.createElement("div", { id: "parent" },
                    Cascade_1.default.createElement(StaticChild, null),
                    viewModel.visible ? null : null));
            }
        }
        var viewModel = new ViewModel();
        var root = (Cascade_1.default.createElement("div", { id: "root" },
            Cascade_1.default.createElement(Parent, { viewModel: viewModel })));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        await (0, PromiseUtil_1.wait)(0);
        viewModel.visible = true;
        await (0, PromiseUtil_1.wait)(20);
        let divRoot = container.childNodes[0];
        let divParent = divRoot.childNodes[0];
        let divStatic = divParent.childNodes[0];
        let divDynamic = divParent.childNodes[1];
        expect(divStatic).toBeDefined();
        expect(divDynamic).toBeUndefined();
    });
});
//# sourceMappingURL=Component.diff.test.js.map