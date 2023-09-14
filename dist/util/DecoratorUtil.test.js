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
const Computed_1 = require("../graph/Computed");
const DecoratorUtil_1 = require("./DecoratorUtil");
describe('DecoratorUtil', () => {
    function minLength(length = 0) {
        return function (target, propertyKey, descriptor) {
            DecoratorUtil_1.default.attachObservable(target, propertyKey + '_minLength', (value, thisArg) => {
                return new Computed_1.default(function () {
                    let value = thisArg[propertyKey];
                    return typeof value === 'string' && value.length >= length;
                }, false, thisArg);
            }, true);
        };
    }
    it('should provide secondary Decorators', () => {
        class ViewModel {
            constructor() {
                this.value = 'abcd';
            }
        }
        __decorate([
            minLength(1),
            Decorators_1.observable,
            __metadata("design:type", String)
        ], ViewModel.prototype, "value", void 0);
        let viewModel = new ViewModel();
        expect(viewModel['value_minLength']).toBe(true);
    });
});
//# sourceMappingURL=DecoratorUtil.test.js.map