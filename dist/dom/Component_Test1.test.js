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
class ViewModel {
    constructor() {
        this.runs = 0;
        this.info = 'test';
    }
}
__decorate([
    Decorators_1.observable,
    __metadata("design:type", String)
], ViewModel.prototype, "info", void 0);
class Parent extends Component_1.Component {
    render() {
        return (Cascade_1.default.createElement("div", { id: "parent" },
            Cascade_1.default.createElement(Child, { id: "child", info: this.props.viewModel.info }, "text")));
    }
}
class Child extends Component_1.Component {
    render() {
        return Cascade_1.default.createElement("div", { id: this.props.id },
            "Custom Component - ",
            this.props.info);
    }
}
describe('Component', function () {
    it('should update when observables change', async function () {
        var viewModel = new ViewModel();
        var container = document.createElement('div');
        var runs = [];
        Cascade_1.default.render(container, Cascade_1.default.createElement(Parent, { viewModel: viewModel }));
        var child = container.querySelector('#child');
        runs.push(child.childNodes[1].data);
        await Cascade_1.default.set(viewModel, 'info', 'abcd');
        var child = container.querySelector('#child');
        runs.push(child.childNodes[1].data);
        expect(runs[0]).toBe('test');
        expect(runs[1]).toBe('abcd');
    });
});
//# sourceMappingURL=Component_Test1.test.js.map