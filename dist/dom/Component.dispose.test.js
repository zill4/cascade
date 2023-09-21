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
describe('Component.dispose', () => {
    it('should dispose of nested Components', async () => {
        class ViewModel {
            constructor() {
                this.valueA = true;
                this.valueB = true;
                this.valueC = true;
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Boolean)
        ], ViewModel.prototype, "valueA", void 0);
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Boolean)
        ], ViewModel.prototype, "valueB", void 0);
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Boolean)
        ], ViewModel.prototype, "valueC", void 0);
        let viewDisposed = 0;
        class View extends Component_1.Component {
            render() {
                let { viewModel } = this.props;
                return (Cascade_1.default.createElement("div", { key: "view" }, viewModel.valueA ? (Cascade_1.default.createElement(Parent, { viewModel: viewModel })) : (Cascade_1.default.createElement("div", null, viewModel.valueA))));
            }
            afterDispose() {
                viewDisposed++;
            }
        }
        let parentDisposed = 0;
        class Parent extends Component_1.Component {
            render() {
                let { viewModel } = this.props;
                return (Cascade_1.default.createElement("div", { key: "parent" }, viewModel.valueB ? (Cascade_1.default.createElement(Child, { viewModel: viewModel })) : (Cascade_1.default.createElement("div", null, viewModel.valueB))));
            }
            afterDispose() {
                parentDisposed++;
            }
        }
        let childDisposed = 0;
        class Child extends Component_1.Component {
            render() {
                let { viewModel } = this.props;
                return Cascade_1.default.createElement("div", { key: "child" }, viewModel.valueC);
            }
            afterDispose() {
                childDisposed++;
            }
        }
        let viewModel = new ViewModel();
        var root = (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement(View, { viewModel: viewModel })));
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        await (0, PromiseUtil_1.wait)(0);
        viewModel.valueA = false;
        await (0, PromiseUtil_1.wait)(0);
        viewModel.valueA = true;
        await (0, PromiseUtil_1.wait)(0);
        viewModel.valueB = false;
        await (0, PromiseUtil_1.wait)(20);
        expect(viewDisposed).toBe(0);
        expect(parentDisposed).toBe(1);
        expect(childDisposed).toBe(2);
    });
    it('should not dispose of persisted nested Components', async () => {
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
        let viewDisposed = 0;
        class View extends Component_1.Component {
            render() {
                let { viewModel } = this.props;
                return (Cascade_1.default.createElement("div", { key: "view" },
                    Cascade_1.default.createElement(Parent, { viewModel: viewModel }),
                    Cascade_1.default.createElement("div", null, viewModel.valueA)));
            }
            afterDispose() {
                viewDisposed++;
            }
        }
        let parentDisposed = 0;
        class Parent extends Component_1.Component {
            render() {
                let { viewModel } = this.props;
                return (Cascade_1.default.createElement("div", { key: "parent" },
                    Cascade_1.default.createElement(Child, { viewModel: viewModel }),
                    Cascade_1.default.createElement("div", null, viewModel.valueB)));
            }
            afterDispose() {
                parentDisposed++;
            }
        }
        let childDisposed = 0;
        class Child extends Component_1.Component {
            render() {
                let { viewModel } = this.props;
                return Cascade_1.default.createElement("div", { key: "child" }, viewModel.valueC);
            }
            afterDispose() {
                childDisposed++;
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
        expect(viewDisposed).toBe(0);
        expect(parentDisposed).toBe(0);
        expect(childDisposed).toBe(0);
    });
});
//# sourceMappingURL=Component.dispose.test.js.map