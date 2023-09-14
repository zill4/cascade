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
const CascadeError_1 = require("../util/CascadeError");
const Computed_1 = require("./Computed");
const Observable_1 = require("./Observable");
describe('Computed', () => {
    it('should compute non-observable values', () => {
        var value = new Computed_1.default(() => {
            return 1;
        });
        expect(value.getValue()).toBe(1);
    });
    it('should compute observable values', () => {
        var obs = new Observable_1.default(1);
        var value = new Computed_1.default(() => {
            return obs.getValue();
        });
        expect(value.getValue()).toBe(1);
    });
    it('should subscribe once per Observable', () => {
        var obs = new Observable_1.default(1);
        let readCount = 0;
        let referenceCount = 0;
        var value = new Computed_1.default(() => {
            obs.getValue();
            let observableContext = window['$_cascade_observable_context'];
            let context = observableContext.context;
            let output = obs.getValue();
            readCount = context.length;
            return output;
        });
        referenceCount = value.references.length;
        expect(readCount).toBe(2);
        expect(referenceCount).toBe(1);
    });
});
describe('Cascade.createComputed', () => {
    it('should compute non-observable values', () => {
        class ViewModel {
            constructor() {
                Cascade_1.default.createComputed(this, 'value', () => {
                    return 1;
                });
            }
        }
        var viewModel = new ViewModel();
        expect(viewModel.value).toBe(1);
    });
    it('should compute observable values', () => {
        class ViewModel {
            constructor() {
                Cascade_1.default.createObservable(this, 'obs', 1);
                Cascade_1.default.createComputed(this, 'value', () => {
                    return this.obs;
                });
            }
        }
        var viewModel = new ViewModel();
        expect(viewModel.value).toBe(1);
    });
});
describe('Computed @observable Decorator', () => {
    it('should compute non-observable values', () => {
        class ViewModel {
            get value() {
                return 1;
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], ViewModel.prototype, "value", null);
        var viewModel = new ViewModel();
        expect(viewModel.value).toBe(1);
    });
    it('should compute observable values', () => {
        class ViewModel {
            constructor() {
                this.obs = 1;
            }
            get value() {
                return this.obs;
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Object)
        ], ViewModel.prototype, "obs", void 0);
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], ViewModel.prototype, "value", null);
        var viewModel = new ViewModel();
        expect(viewModel.value).toBe(1);
    });
});
describe('Cascade.waitToEqual', () => {
    it('should run on equal, and not run twice', async () => {
        class ViewModel {
            constructor() {
                this.a = false;
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Boolean)
        ], ViewModel.prototype, "a", void 0);
        var viewModel = new ViewModel();
        window.setTimeout(() => {
            viewModel.a = true;
            window.setTimeout(() => {
                viewModel.a = false;
            }, 10);
        }, 10);
        let result = await Cascade_1.default.waitToEqual(viewModel, 'a', true, 100);
        expect(result).toBe(true);
    });
    it('should not run if not equal, and then throw an error if time elapses', async () => {
        class ViewModel {
            constructor() {
                this.a = false;
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Boolean)
        ], ViewModel.prototype, "a", void 0);
        var viewModel = new ViewModel();
        window.setTimeout(() => {
            viewModel.a = undefined;
        }, 10);
        try {
            var result = await Cascade_1.default.waitToEqual(viewModel, 'a', true, 100);
        }
        catch (e) {
            expect(e).toBeDefined();
            expect(e.message).toBe(CascadeError_1.CascadeError.TimeoutElapsed);
        }
        expect(result).not.toBe(true);
    });
});
//# sourceMappingURL=Computed.test.js.map