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
const Decorators_1 = require("./Decorators");
describe('ObservableHash @hash Decorator', () => {
    it('should initialize to an emtpy Array', () => {
        class ViewModel {
        }
        __decorate([
            Decorators_1.hash,
            __metadata("design:type", Object)
        ], ViewModel.prototype, "value", void 0);
        var viewModel = new ViewModel();
        expect(viewModel.value).toBeInstanceOf(Object);
    });
    it('should initialize in the constructor to an Array', () => {
        class ViewModel {
            constructor() {
                this.value = {
                    property: 10,
                };
            }
        }
        __decorate([
            Decorators_1.hash,
            __metadata("design:type", Object)
        ], ViewModel.prototype, "value", void 0);
        var viewModel = new ViewModel();
        expect(viewModel.value['property']).toBe(10);
    });
});
//# sourceMappingURL=ObservableHash_Decorator.test.js.map