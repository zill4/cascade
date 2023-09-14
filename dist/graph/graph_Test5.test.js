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
const Decorators_1 = require("../cascade/Decorators");
class ViewModel {
    constructor() {
        this.runs = 0;
        this.a = 1;
        this.b = 2;
    }
    get ab() {
        this.runs++;
        return this.a + this.b;
    }
}
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Object)
], ViewModel.prototype, "a", void 0);
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Object)
], ViewModel.prototype, "b", void 0);
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ViewModel.prototype, "ab", null);
describe('Graph.dispose', function () {
    it('should dispose subscriptions to props', function () {
        var model = new ViewModel();
        var ab = model.ab;
        model._graph.dispose();
        expect(model._graph.observables.a.subscribers.length).toBe(0);
        expect(model._graph.observables.b.subscribers.length).toBe(0);
        expect(model.runs).toBe(1);
    });
});
//# sourceMappingURL=graph_Test5.test.js.map