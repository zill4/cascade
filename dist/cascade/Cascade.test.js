Object.defineProperty(exports, "__esModule", { value: true });
const Cascade_1 = require("./Cascade");
describe('Cascade', function () {
    describe('createObservable', function () {
        it('should initialize to undefined', function () {
            class ViewModel {
                constructor() {
                    Cascade_1.default.createObservable(this, 'value');
                }
            }
            var viewModel = new ViewModel();
            expect(viewModel.value).toBeUndefined();
        });
        it('should initialize in the constructor to a value', function () {
            class ViewModel {
                constructor() {
                    Cascade_1.default.createObservable(this, 'value', 1);
                }
            }
            var viewModel = new ViewModel();
            expect(viewModel.value).toBe(1);
        });
    });
    describe('createObservableArray', function () {
        it('should initialize undefined to empty', function () {
            class ViewModel {
                constructor() {
                    Cascade_1.default.createObservableArray(this, 'value');
                }
            }
            var viewModel = new ViewModel();
            expect(viewModel.value.length).toBe(0);
        });
        it('should initialize in the constructor to a value', function () {
            class ViewModel {
                constructor() {
                    Cascade_1.default.createObservableArray(this, 'value', [1]);
                }
            }
            var viewModel = new ViewModel();
            expect(viewModel.value.length).toBe(1);
        });
    });
    describe('createObservableHash', function () {
        it('should initialize undefined to empty', function () {
            class ViewModel {
                constructor() {
                    Cascade_1.default.createObservableHash(this, 'value');
                }
            }
            var viewModel = new ViewModel();
            expect(viewModel.value).toBeInstanceOf(Object);
        });
        it('should initialize in the constructor to a value', function () {
            class ViewModel {
                constructor() {
                    Cascade_1.default.createObservableHash(this, 'value', {
                        property: 10,
                    });
                }
            }
            var viewModel = new ViewModel();
            expect(viewModel.value['property']).toBe(10);
        });
    });
});
//# sourceMappingURL=Cascade.test.js.map