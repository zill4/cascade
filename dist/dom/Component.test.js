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
require("reflect-metadata");
const Cascade_1 = require("../cascade/Cascade");
const Decorators_1 = require("../cascade/Decorators");
const PromiseUtil_1 = require("../util/PromiseUtil");
const Component_1 = require("./Component");
describe('Component.toNode', function () {
    it('should render a Node', function () {
        class CustomComponent extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement("div", { id: this.props.id },
                    "Custom Component - ",
                    this.props.info);
            }
        }
        var root = (Cascade_1.default.createElement(CustomComponent, { id: "child", info: "test" }, "text"));
        let element = Cascade_1.default.render(document.createElement('div'), root);
        expect(element.textContent).toBe('Custom Component - test');
    });
    it('should render falsy values', () => {
        class CustomComponent extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement("div", null, this.children);
            }
        }
        var root = Cascade_1.default.createElement(CustomComponent, null, "0");
        let element = Cascade_1.default.render(document.createElement('div'), root);
        expect(element.childNodes[0].data).toBe('0');
    });
    it('should render object values', async () => {
        class ViewModel {
            constructor() {
                this.values = [];
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Array)
        ], ViewModel.prototype, "values", void 0);
        class CustomComponent extends Component_1.Component {
            render() {
                return (Cascade_1.default.createElement("ul", null, this.props.viewModel.values.map((value) => {
                    return value;
                })));
            }
        }
        var viewModel = new ViewModel();
        var root = Cascade_1.default.createElement(CustomComponent, { viewModel: viewModel });
        var element = document.createElement('div');
        Cascade_1.default.render(element, root);
        await (0, PromiseUtil_1.wait)(0);
        viewModel.values.push(1);
        await (0, PromiseUtil_1.wait)(0);
        viewModel.values.push(null);
        await (0, PromiseUtil_1.wait)(0);
        viewModel.values.push(2);
        await (0, PromiseUtil_1.wait)(0);
        viewModel.values.push({});
        await (0, PromiseUtil_1.wait)(0);
        viewModel.values.push(3);
        await (0, PromiseUtil_1.wait)(0);
        viewModel.values.push(undefined);
        await (0, PromiseUtil_1.wait)(20);
        viewModel.values.push(4);
        await (0, PromiseUtil_1.wait)(0);
        expect(element.childNodes[0].childNodes.length).toBe(5);
    });
    it('should pass children directly into high order Components', () => {
        let length = undefined;
        class Child extends Component_1.Component {
            render() {
                length = this.children.length;
                return Cascade_1.default.createElement("div", null, "this.children");
            }
        }
        class Parent extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement(Child, null, this.children);
            }
        }
        class View extends Component_1.Component {
            render() {
                return (Cascade_1.default.createElement(Parent, null,
                    Cascade_1.default.createElement("div", null, "0"),
                    Cascade_1.default.createElement("div", null, "1"),
                    Cascade_1.default.createElement("div", null, "2")));
            }
        }
        var root = Cascade_1.default.createElement(View, null);
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        expect(length).toBe(3);
    });
});
//# sourceMappingURL=Component.test.js.map