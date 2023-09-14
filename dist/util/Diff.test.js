Object.defineProperty(exports, "__esModule", { value: true });
const Diff_1 = require("./Diff");
describe('Diff', function () {
    it('should be able to diff empty and a value', function () {
        var lcs = createLCS(Diff_1.default.compare('', 'a'));
        expect(lcs).toBe('');
    });
    it('should be able to diff a value and empty', function () {
        var lcs = createLCS(Diff_1.default.compare('a', ''));
        expect(lcs).toBe('');
    });
    it('should be able to diff an added character', function () {
        var lcs = createLCS(Diff_1.default.compare('a', 'ab'));
        expect(lcs).toBe('a');
    });
    it('should be able to diff same first character', function () {
        var lcs = createLCS(Diff_1.default.compare('ab', 'ac'));
        expect(lcs).toBe('a');
    });
    it('should be able to diff same last character', function () {
        var lcs = createLCS(Diff_1.default.compare('ac', 'bc'));
        expect(lcs).toBe('c');
    });
    it('should be able to diff different length differences', function () {
        var lcs = createLCS(Diff_1.default.compare('acd', 'bd'));
        expect(lcs).toBe('d');
    });
    it('should be able to diff a complex change', function () {
        var lcs = createLCS(Diff_1.default.compare('abcde', 'abdfe'));
        expect(lcs).toBe('abde');
    });
});
function createLCS(diff) {
    diff.reverse();
    var lcs = [];
    for (var index = 0, length = diff.length; index < length; index++) {
        var diffItem = diff[index];
        if (diffItem.operation === 0) {
            lcs.push(diffItem.item);
        }
    }
    return lcs.join('');
}
//# sourceMappingURL=Diff.test.js.map