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
describe('Cascade.subscribe', () => {
    it('should call a function on change', async () => {
        class State {
            constructor() {
                this.value = 1;
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Object)
        ], State.prototype, "value", void 0);
        let state = new State();
        let run = 0;
        let finalValue = undefined;
        Cascade_1.default.subscribe(state, 'value', (value) => {
            run++;
            finalValue = value;
        });
        state.value = 10;
        await (0, PromiseUtil_1.wait)(20);
        expect(run).toBe(2);
        expect(finalValue).toBe(10);
    });
    it.skip('should not call a function when value has not changed', async () => {
        class State {
            constructor() {
                this.value = 1;
            }
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Object)
        ], State.prototype, "value", void 0);
        let state = new State();
        let run = 0;
        let finalValue = undefined;
        Cascade_1.default.subscribe(state, 'value', (value) => {
            run++;
            finalValue = value;
        });
        state.value = 0;
        await (0, PromiseUtil_1.wait)(20);
        expect(run).toBe(1);
        expect(finalValue).toBe(0);
    });
    it.skip('should return a disposer function', () => { });
    it('should initialize an Observable', async () => {
        class State {
        }
        __decorate([
            Decorators_1.observable,
            __metadata("design:type", Number)
        ], State.prototype, "value", void 0);
        let state = new State();
        let values = [];
        Cascade_1.default.subscribe(state, 'value', (value) => {
            values.push(value);
        });
        state.value = 1;
        await Cascade_1.default.track(state, 'value');
        expect(values.length).toBe(2);
        expect(values[0]).toBe(undefined);
        expect(values[1]).toBe(1);
    });
});
//# sourceMappingURL=Subscribe.test.js.map