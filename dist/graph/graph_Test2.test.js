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
        this.a = [1, 2, 3, 4];
    }
    get loop() {
        var a = this.a;
        var total = 0;
        for (var index = 0, length = a.length; index < length; index++) {
            total += a[index];
        }
        return total;
    }
}
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Array)
], ViewModel.prototype, "a", void 0);
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ViewModel.prototype, "loop", null);
describe('Graph', function () {
    it('should observe changes to Arrays', function () {
        var viewModel = new ViewModel();
        var complete = false;
        viewModel._graph.subscribe('loop', function (value) {
            viewModel.runs++;
            if (complete) {
                expect(value).toBe(120);
                expect(viewModel.runs).toBe(2);
            }
        });
        viewModel.a.push(10);
        viewModel.a.push(100);
        complete = true;
    });
});
//# sourceMappingURL=graph_Test2.test.js.map