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
        this.runsAB = 0;
        this.runsABC = 0;
        this.a = 1;
        this.b = 2;
        this.c = 3;
    }
    get ab() {
        this.runsAB++;
        return this.a + this.b;
    }
    get abc() {
        this.runsABC++;
        return this.ab + this.c;
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
    __metadata("design:type", Object)
], ViewModel.prototype, "c", void 0);
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ViewModel.prototype, "ab", null);
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ViewModel.prototype, "abc", null);
describe('Graph.pull', function () {
    it('should push changes after pull', function () {
        var model = new ViewModel();
        model._graph.subscribe('abc', function () {
            if (complete) {
                expect(ab).toBe(13);
                expect(model.runsAB).toBe(2);
                expect(model.runsABC).toBe(2);
            }
        });
        var complete = false;
        model.a = 11;
        var ab = model.ab;
        var complete = true;
    });
});
//# sourceMappingURL=graph_Test4.test.js.map