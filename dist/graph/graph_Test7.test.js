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
        this.runsE = 0;
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
    get e() {
        this.runsE++;
        return this.d;
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
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ViewModel.prototype, "e", null);
describe('Graph.pull', function () {
    it('should pull changes to deep layers', function () {
        var model = new ViewModel();
        model._graph.subscribe('e', function (value) {
            if (result) {
                result.finalE = value;
                result.finalRunsE = model.runsE;
                expect(result.a).toBe(11);
                expect(result.b).toBe(11);
                expect(result.c).toBe(11);
                expect(result.d).toBe(11);
                expect(result.e).toBe(1);
                expect(result.finalE).toBe(11);
                expect(result.runsB).toBe(2);
                expect(result.runsC).toBe(2);
                expect(result.runsD).toBe(2);
                expect(result.runsE).toBe(1);
                expect(result.finalRunsE).toBe(2);
            }
        });
        model.a = 11;
        var d = model.d;
        var result = {
            a: model._graph.observables.a.value,
            b: model._graph.observables.b.value,
            c: model._graph.observables.c.value,
            d: d,
            e: model._graph.observables.e.value,
            runsB: model.runsB,
            runsC: model.runsC,
            runsD: model.runsD,
            runsE: model.runsE,
        };
    });
});
//# sourceMappingURL=graph_Test7.test.js.map