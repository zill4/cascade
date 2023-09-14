Object.defineProperty(exports, "__esModule", { value: true });
const ObservableHash_1 = require("./ObservableHash");
describe('ObservableHash', function () {
    it('should initialize to an emtpy Hash', function () {
        var value = new ObservableHash_1.default();
        expect(value.getValue()).toBeInstanceOf(Object);
    });
    it('should initialize non Object parameters in the constructor to an Object', function () {
        var value = new ObservableHash_1.default('test');
        expect(value.getValue()).toBeInstanceOf(Object);
    });
    it('should initialize in the constructor to an Object', function () {
        var value = new ObservableHash_1.default({
            property: 1,
        });
        expect(value.getValue().property).toBe(1);
    });
    it('should notify subscribers on setter', function (done) {
        var value = new ObservableHash_1.default();
        value.subscribeOnly((currentValue) => {
            expect(currentValue['test']).toBe(1);
            done();
        });
        value.setValue({ test: 1 });
    });
    it('should notify subscribers on property setter', function (done) {
        var value = new ObservableHash_1.default();
        value.subscribeOnly((currentValue) => {
            expect(currentValue['property']).toBe(10);
            done();
        });
        value.peek()['property'] = 10;
    });
    it('should not notify subscribers on identical setter', async () => {
        var value = new ObservableHash_1.default();
        let hashes = [];
        value.subscribeOnly((array) => {
            hashes.push(array);
        });
        let hash0 = { test: 0 };
        let hash1 = { test: 1 };
        value.setValue(hash0);
        await value.track();
        value.setValue(hash1);
        await value.track();
        value.setValue(hash1);
        await value.track();
        expect(hashes.length).toBe(2);
        expect(hashes[0]['test']).toBe(0);
        expect(hashes[1]['test']).toBe(1);
    });
    it('should not notify subscribers on identical index setter', async () => {
        var value = new ObservableHash_1.default();
        let values = [];
        value.subscribeOnly((hash) => {
            values.push(hash['test']);
        });
        value.peek()['test'] = 0;
        await value.track();
        value.peek()['test'] = 1;
        await value.track();
        value.peek()['test'] = 1;
        await value.track();
        expect(values.length).toBe(2);
        expect(values[0]).toBe(0);
        expect(values[1]).toBe(1);
    });
    it('should notify subscribers on delete', function (done) {
        var value = new ObservableHash_1.default({
            property: 10,
        });
        value.subscribeOnly((currentValue) => {
            expect(currentValue['property']).toBe(undefined);
            done();
        });
        delete value.peek()['property'];
    });
});
//# sourceMappingURL=ObservableHash.test.js.map