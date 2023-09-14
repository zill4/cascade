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
describe('Observable.alwaysNotify', () => {
    class State {
        constructor() {
            this.value = 0;
        }
    }
    __decorate([
        Decorators_1.observable,
        __metadata("design:type", Number)
    ], State.prototype, "value", void 0);
    __decorate([
        Decorators_1.hash,
        __metadata("design:type", Object)
    ], State.prototype, "hash", void 0);
    __decorate([
        Decorators_1.array,
        __metadata("design:type", Array)
    ], State.prototype, "array", void 0);
    it('should notify for Observable', async () => {
        let state = new State();
        let values = [];
        Cascade_1.default.setAlwaysNotify(state, 'value', true);
        Cascade_1.default.subscribe(state, 'value', (value) => {
            values.push(value);
        });
        state.value = 1;
        await Cascade_1.default.track(state, 'value');
        state.value = 1;
        await Cascade_1.default.track(state, 'value');
        expect(values.length).toBe(3);
        expect(values[0]).toBe(0);
        expect(values[1]).toBe(1);
        expect(values[2]).toBe(1);
    });
    it('should notify for ObservableArray', async () => {
        let state = new State();
        let arrays = [];
        Cascade_1.default.setAlwaysNotify(state, 'array', true);
        Cascade_1.default.subscribe(state, 'array', (value) => {
            arrays.push(value);
        });
        let array = [1];
        state.array = array;
        await Cascade_1.default.track(state, 'array');
        state.array = array;
        await Cascade_1.default.track(state, 'array');
        expect(arrays.length).toBe(3);
        expect(arrays[0].length).toBe(0);
        expect(arrays[1][0]).toBe(1);
        expect(arrays[2][0]).toBe(1);
    });
    it('should notify for ObservableHash', async () => {
        let state = new State();
        let values = [];
        Cascade_1.default.setAlwaysNotify(state, 'hash', true);
        Cascade_1.default.subscribe(state, 'hash', (value) => {
            values.push(value['test']);
        });
        let hash = { test: 1 };
        state.hash = hash;
        await Cascade_1.default.track(state, 'hash');
        state.hash = hash;
        await Cascade_1.default.track(state, 'hash');
        expect(values.length).toBe(3);
        expect(values[0]).toBe(undefined);
        expect(values[1]).toBe(1);
        expect(values[2]).toBe(1);
    });
});
//# sourceMappingURL=Observable.alwaysNotify.test.js.map