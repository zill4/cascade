Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("./Observable");
describe('Observable', () => {
    it('should initialize to undefined', () => {
        var value = new Observable_1.default();
        expect(value.getValue()).toBe(undefined);
    });
    it('should initialize in the constructor to a value', () => {
        var value = new Observable_1.default(1);
        expect(value.getValue()).toBe(1);
    });
});
//# sourceMappingURL=Observable.test.js.map