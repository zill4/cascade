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
class ViewModel {
    constructor() {
        this.runsA = 0;
        this.runsB = 0;
        this.a = 'a';
        this.list = [1, 2, 3, 4];
    }
}
__decorate([
    Decorators_1.observable,
    __metadata("design:type", String)
], ViewModel.prototype, "a", void 0);
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Array)
], ViewModel.prototype, "list", void 0);
class Parent extends Component_1.Component {
    render() {
        this.props.viewModel.runsA++;
        return Cascade_1.default.createElement(Child, { id: "child", viewModel: this.props.viewModel });
    }
}
class Child extends Component_1.Component {
    render() {
        this.props.viewModel.runsB++;
        return (Cascade_1.default.createElement("ul", null, this.props.viewModel.list.map((item) => (Cascade_1.default.createElement("li", null, item)))));
    }
}
describe('Component', function () {
    it('should updated directly nested Components with arrays', async function () {
        var viewModel = new ViewModel();
        var container = document.createElement('div');
        Cascade_1.default.render(container, Cascade_1.default.createElement(Parent, { viewModel: viewModel }));
        await (0, PromiseUtil_1.wait)(1);
        viewModel.list.push(5);
        await (0, PromiseUtil_1.wait)(20);
        expect(container.querySelectorAll('li').length).toBe(5);
        expect(viewModel.runsA).toBe(1);
        expect(viewModel.runsB).toBe(2);
    });
});
//# sourceMappingURL=Component_Test7.test.js.map