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
class ViewModel {
    constructor() {
        this.id = 'oldId';
    }
}
__decorate([
    Decorators_1.observable,
    __metadata("design:type", String)
], ViewModel.prototype, "id", void 0);
class Parent extends Component_1.Component {
    render() {
        return (Cascade_1.default.createElement("div", { id: "parent" },
            Cascade_1.default.createElement("span", { id: this.props.viewModel.id }, "Text")));
    }
}
describe('Component', function () {
    it('should render property updates', async function () {
        var viewModel = new ViewModel();
        var container = document.createElement('div');
        var runs = [];
        Cascade_1.default.render(container, Cascade_1.default.createElement(Parent, { viewModel: viewModel }));
        var parent = container.querySelector('#parent');
        runs.push(parent.childNodes[0].id);
        viewModel.id = 'newId';
        await (0, PromiseUtil_1.wait)(20);
        var parent = container.querySelector('#parent');
        runs.push(parent.childNodes[0].id);
        expect(runs[0]).toBe('oldId');
        expect(runs[1]).toBe('newId');
    });
});
//# sourceMappingURL=Component_Test10.test.js.map