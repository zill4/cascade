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
        this.clicked = 0;
        this.clickedValue = '';
        this.value = '';
    }
    onclick() {
        this.clicked++;
        this.clickedValue = this.value;
    }
}
__decorate([
    Decorators_1.observable,
    __metadata("design:type", String)
], ViewModel.prototype, "value", void 0);
class Parent extends Component_1.Component {
    onclick() {
        this.props.viewModel.onclick();
    }
    onchange(event) {
        this.props.viewModel.value = event.target.value;
    }
    render() {
        return (Cascade_1.default.createElement(Child, { viewModel: this.props.viewModel, onclick: this.onclick.bind(this), onchange: this.onchange.bind(this) }));
    }
}
class Child extends Component_1.Component {
    render() {
        return (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement("input", { id: "test9-input", type: "text", value: this.props.viewModel.value, onchange: this.props.onchange }),
            Cascade_1.default.createElement("button", { id: "test9-button", onclick: this.props.onclick }, "Click")));
    }
}
describe('Component', function () {
    it('should attach events to DOM elements', function () {
        var viewModel = new ViewModel();
        var container = document.createElement('div');
        Cascade_1.default.render(container, Cascade_1.default.createElement(Parent, { viewModel: viewModel }));
        var inputElement = container.querySelector('#test9-input');
        var buttonElement = container.querySelector('#test9-button');
        inputElement.value = '1234';
        var event = document.createEvent('Event');
        event.initEvent('change', true, true);
        inputElement.dispatchEvent(event);
        buttonElement.click();
        expect(viewModel.clicked).toBe(1);
        expect(viewModel.clickedValue).toBe('1234');
    });
});
//# sourceMappingURL=Component_Test6.test.js.map