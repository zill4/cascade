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
class ViewModel {
    constructor() {
        this.runs = 0;
        this.a = 1;
        this.b = 2;
        this.c = 3;
        this.d = 4;
    }
    get ab() {
        return this.a + this.b;
    }
    get ac() {
        return this.a + this.c;
    }
    get ad() {
        return this.a + this.d;
    }
    get bc() {
        return this.b + this.c;
    }
    get bd() {
        return this.b + this.d;
    }
    get cd() {
        return this.c + this.d;
    }
    get abcd() {
        return this.ab + this.ac + this.ad + this.bc + this.bd + this.cd;
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
    __metadata("design:type", Number)
], ViewModel.prototype, "d", void 0);
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ViewModel.prototype, "ab", null);
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ViewModel.prototype, "ac", null);
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ViewModel.prototype, "ad", null);
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ViewModel.prototype, "bc", null);
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ViewModel.prototype, "bd", null);
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ViewModel.prototype, "cd", null);
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ViewModel.prototype, "abcd", null);
describe('Graph', function () {
    it('should have minimal computed updates', function () {
        var viewModel = new ViewModel();
        var complete = false;
        viewModel._graph.subscribe('abcd', function (value) {
            viewModel.runs++;
            if (complete) {
                expect(value).toBe(150);
                expect(viewModel.runs).toBe(2);
            }
        });
        viewModel.a = 11;
        viewModel.b = 12;
        viewModel.c = 13;
        viewModel.d = 14;
        complete = true;
    });
});
describe('Cascade.track', () => {
    it('should emit a Promise which resolves when push is complete', async () => {
        var viewModel = new ViewModel();
        await (0, PromiseUtil_1.wait)(20);
        var abcd = undefined;
        viewModel._graph.subscribe('abcd', function (value) { });
        viewModel.a = 11;
        viewModel.b = 12;
        viewModel.c = 13;
        viewModel.d = 14;
        await Cascade_1.default.track(viewModel, 'd');
        abcd = Cascade_1.default.peekDirty(viewModel, 'abcd');
        expect(abcd).toBe(150);
    });
});
describe('Cascade.trackAll', () => {
    it('should emit a Promise which resolves when push is complete', async () => {
        var viewModel = new ViewModel();
        await (0, PromiseUtil_1.wait)(20);
        var abcd = undefined;
        viewModel._graph.subscribe('abcd', function (value) { });
        viewModel.a = 11;
        viewModel.b = 12;
        viewModel.c = 13;
        viewModel.d = 14;
        await Cascade_1.default.trackAll(viewModel);
        abcd = Cascade_1.default.peekDirty(viewModel, 'abcd');
        expect(abcd).toBe(150);
    });
});
//# sourceMappingURL=graph_Test0.test.js.map