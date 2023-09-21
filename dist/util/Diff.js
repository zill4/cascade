Object.defineProperty(exports, "__esModule", { value: true });
exports.DiffOperation = void 0;
class Diff {
    static createTable(m, n) {
        var table = new Array(m);
        for (var i = 0; i < m; i++) {
            table[i] = new Array(n);
        }
        return table;
    }
    static compare(x, y, comparison) {
        var m = x.length;
        var n = y.length;
        var table = Diff.createTable(m + 1, n + 1);
        for (var i = 0; i <= m; i++) {
            for (var j = 0; j <= n; j++) {
                if (i == 0 || j == 0) {
                    table[i][j] = 0;
                }
                else if (comparison ? comparison(x[i - 1], y[j - 1]) : x[i - 1] == y[j - 1]) {
                    table[i][j] = table[i - 1][j - 1] + 1;
                }
                else {
                    table[i][j] = Diff.max(table[i - 1][j], table[i][j - 1]);
                }
            }
        }
        var diff = [];
        i = m;
        j = n;
        while (i > 0 || j > 0) {
            if (i === 0) {
                while (j > 0) {
                    diff.push({
                        operation: DiffOperation.ADD,
                        item: y[j - 1]
                    });
                    j--;
                }
            }
            else if (j === 0) {
                while (i > 0) {
                    diff.push({
                        operation: DiffOperation.REMOVE,
                        item: x[i - 1]
                    });
                    i--;
                }
            }
            else {
                if (comparison ? comparison(x[i - 1], y[j - 1]) : x[i - 1] == y[j - 1]) {
                    diff.push({
                        operation: DiffOperation.NONE,
                        item: x[i - 1],
                        itemB: y[j - 1]
                    });
                    i--;
                    j--;
                }
                else {
                    if (table[i - 1][j] > table[i][j - 1]) {
                        diff.push({
                            operation: DiffOperation.REMOVE,
                            item: x[i - 1]
                        });
                        i--;
                    }
                    else {
                        diff.push({
                            operation: DiffOperation.ADD,
                            item: y[j - 1]
                        });
                        j--;
                    }
                }
            }
        }
        return diff;
    }
    static max(a, b) {
        return (a > b) ? a : b;
    }
    static compareHash(x, y) {
        var result = {};
        for (var name in x) {
            if (x.hasOwnProperty(name)) {
                var xValue = x[name];
                var yValue = y[name];
                if (xValue !== yValue) {
                    if (yValue == undefined) {
                        result[name] = null;
                    }
                    else {
                        result[name] = yValue;
                    }
                }
            }
        }
        for (var name in y) {
            if (y.hasOwnProperty(name)) {
                var xValue = x[name];
                var yValue = y[name];
                if (xValue !== yValue) {
                    if (yValue == undefined) {
                        result[name] = null;
                    }
                    else {
                        result[name] = yValue;
                    }
                }
            }
        }
        return result;
    }
}
exports.default = Diff;
var DiffOperation;
(function (DiffOperation) {
    DiffOperation[DiffOperation["REMOVE"] = -1] = "REMOVE";
    DiffOperation[DiffOperation["NONE"] = 0] = "NONE";
    DiffOperation[DiffOperation["ADD"] = 1] = "ADD";
})(DiffOperation || (exports.DiffOperation = DiffOperation = {}));
//# sourceMappingURL=Diff.js.map