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
        this.c = 3;
    }
    get ab() {
        return this.a + this.b;
    }
    get bc() {
        return this.b + this.c;
    }
    get aab() {
        return this.a + this.ab;
    }
}
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Number)
], ViewModel.prototype, "a", void 0);
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Number)
], ViewModel.prototype, "b", void 0);
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Number)
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
], ViewModel.prototype, "bc", null);
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ViewModel.prototype, "aab", null);
describe('Graph', function () {
    it('should have minimal updates to mixed level Computed props', function () {
        var viewModel = new ViewModel();
        var complete = false;
        viewModel._graph.subscribe('aab', function (value) {
            viewModel.runs++;
            if (complete) {
                expect(value).toBe(24);
                expect(viewModel.runs).toBe(2);
            }
        });
        viewModel.a = 11;
        complete = true;
    });
});
//# sourceMappingURL=graph_Test1.test.js.map