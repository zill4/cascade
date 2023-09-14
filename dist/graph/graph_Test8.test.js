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
        this.runsB = 0;
        this.runsC = 0;
        this.runsD = 0;
        this.a = 1;
    }
    get b() {
        this.runsB++;
        return this.a;
    }
    get c() {
        this.runsC++;
        return this.b;
    }
    get d() {
        this.runsD++;
        return this.c;
    }
}
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Object)
], ViewModel.prototype, "a", void 0);
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ViewModel.prototype, "b", null);
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ViewModel.prototype, "c", null);
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ViewModel.prototype, "d", null);
describe('Graph.pull', function () {
    it('should pull changes to multiple layers - lower first', function () {
        var model = new ViewModel();
        model.a = 11;
        var b = model.b;
        var c = model.c;
        expect(b).toBe(11);
        expect(c).toBe(11);
        expect(model.runsB).toBe(1);
        expect(model.runsC).toBe(1);
        expect(model.runsD).toBe(0);
    });
    it('should pull changes to multiple layers - higher first', function () {
        var model = new ViewModel();
        model.a = 11;
        var c = model.c;
        var b = model.b;
        expect(b).toBe(11);
        expect(c).toBe(11);
        expect(model.runsB).toBe(1);
        expect(model.runsC).toBe(1);
        expect(model.runsD).toBe(0);
    });
});
//# sourceMappingURL=graph_Test8.test.js.map