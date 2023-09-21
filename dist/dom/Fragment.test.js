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
describe('Fragment.toNode', function () {
    it('should render Fragment Nodes', () => {
        var root = (Cascade_1.default.createElement(Cascade_1.default.Fragment, null,
            Cascade_1.default.createElement("div", { id: "testId" })));
        let rootElement = document.createElement('div');
        let element = Cascade_1.default.render(rootElement, root);
        let div = rootElement.childNodes[0];
        expect(div.id).toBe('testId');
    });
    it.skip('should be able to Diff Fragment and Element', async () => {
        class ViewModel {
            constructor() {
                this.value = false;
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Object)
        ], ViewModel.prototype, "value", void 0);
        class View extends Component_1.Component {
            render() {
                return (Cascade_1.default.createElement("span", null, this.props.viewModel.value ? (Cascade_1.default.createElement("div", null, "c")) : (Cascade_1.default.createElement(Cascade_1.default.Fragment, null,
                    Cascade_1.default.createElement("div", null, "a"),
                    Cascade_1.default.createElement("div", null, "b")))));
            }
        }
        var viewModel = new ViewModel();
        var container = document.createElement('div');
        Cascade_1.default.render(container, Cascade_1.default.createElement(View, { viewModel: viewModel }));
        viewModel.value = true;
        await Cascade_1.default.track(viewModel, 'value');
        let span = container.childNodes[0];
        expect(span.childNodes.length).toBe(1);
        expect(span.childNodes[0].childNodes.length).toBe(1);
        expect(span.childNodes[0].textContent).toBe('c');
        viewModel.value = false;
        await Cascade_1.default.track(viewModel, 'value');
        span = container.childNodes[0];
        expect(span.childNodes.length).toBe(2);
        expect(span.childNodes[0].textContent).toBe('a');
        expect(span.childNodes[1].textContent).toBe('b');
    });
    it.skip('should be able to Diff Fragment and Fragment', async () => {
        class ViewModel {
            constructor() {
                this.value = false;
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Object)
        ], ViewModel.prototype, "value", void 0);
        class View extends Component_1.Component {
            render() {
                return (Cascade_1.default.createElement("span", null, this.props.viewModel.value ? (Cascade_1.default.createElement(Cascade_1.default.Fragment, null,
                    Cascade_1.default.createElement("div", null, "c"))) : (Cascade_1.default.createElement(Cascade_1.default.Fragment, null,
                    Cascade_1.default.createElement("div", null, "a"),
                    Cascade_1.default.createElement("div", null, "b")))));
            }
        }
        var viewModel = new ViewModel();
        var container = document.createElement('div');
        Cascade_1.default.render(container, Cascade_1.default.createElement(View, { viewModel: viewModel }));
        viewModel.value = true;
        await Cascade_1.default.track(viewModel, 'value');
        let span = container.childNodes[0];
        expect(span.childNodes.length).toBe(1);
        expect(span.childNodes[0].childNodes.length).toBe(1);
        expect(span.childNodes[0].textContent).toBe('c');
        viewModel.value = false;
        await Cascade_1.default.track(viewModel, 'value');
        span = container.childNodes[0];
        expect(span.childNodes.length).toBe(2);
        expect(span.childNodes[0].textContent).toBe('a');
        expect(span.childNodes[1].textContent).toBe('b');
    });
    it.skip('should be able to Diff root Fragment and Element', async () => {
        class ViewModel {
            constructor() {
                this.value = true;
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Object)
        ], ViewModel.prototype, "value", void 0);
        class View extends Component_1.Component {
            render() {
                if (this.props.viewModel.value) {
                    return Cascade_1.default.createElement("div", null, "c");
                }
                else {
                    return (Cascade_1.default.createElement(Cascade_1.default.Fragment, null,
                        Cascade_1.default.createElement("div", null, "a"),
                        Cascade_1.default.createElement("div", null, "b")));
                }
            }
        }
        var viewModel = new ViewModel();
        var container = document.createElement('div');
        Cascade_1.default.render(container, Cascade_1.default.createElement(View, { viewModel: viewModel }));
        viewModel.value = false;
        await Cascade_1.default.track(viewModel, 'value');
        let span = container.childNodes[0];
        expect(span.childNodes.length).toBe(2);
        expect(span.childNodes[0].textContent).toBe('a');
        expect(span.childNodes[1].textContent).toBe('b');
        viewModel.value = true;
        await Cascade_1.default.track(viewModel, 'value');
        span = container.childNodes[0];
        expect(span.childNodes.length).toBe(2);
        expect(span.childNodes[0].textContent).toBe('a');
        expect(span.childNodes[1].textContent).toBe('b');
    });
    it.skip('should be able to Diff nested root Fragment to Element', async () => {
        class ViewModel {
            constructor() {
                this.value = false;
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Object)
        ], ViewModel.prototype, "value", void 0);
        class WithFragments extends Component_1.Component {
            render() {
                return (Cascade_1.default.createElement(Cascade_1.default.Fragment, null,
                    Cascade_1.default.createElement("div", null, "a"),
                    Cascade_1.default.createElement("div", null, "b")));
            }
        }
        class WithoutFragments extends Component_1.Component {
            render() {
                return Cascade_1.default.createElement("div", null, "c");
            }
        }
        class View extends Component_1.Component {
            render() {
                return (Cascade_1.default.createElement("span", null, this.props.viewModel.value ? Cascade_1.default.createElement(WithoutFragments, null) : Cascade_1.default.createElement(WithFragments, null)));
            }
        }
        var viewModel = new ViewModel();
        var container = document.createElement('div');
        Cascade_1.default.render(container, Cascade_1.default.createElement(View, { viewModel: viewModel }));
        viewModel.value = true;
        await (0, PromiseUtil_1.wait)(20);
        let span = container.childNodes[0];
        let div = span.childNodes[0];
        let text = div.textContent;
        expect(span.childNodes.length).toBe(1);
        expect(div.childNodes.length).toBe(1);
        expect(text).toBe('c');
    });
});
//# sourceMappingURL=Fragment.test.js.map