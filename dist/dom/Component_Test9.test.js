Object.defineProperty(exports, "__esModule", { value: true });
const Cascade_1 = require("../cascade/Cascade");
const Diff_1 = require("../util/Diff");
const Component_1 = require("./Component");
class OldComponent extends Component_1.Component {
    render() {
        return (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement("span", null, "Text")));
    }
}
class NewComponent extends Component_1.Component {
    render() {
        return (Cascade_1.default.createElement("div", null,
            Cascade_1.default.createElement("div", null, "Text")));
    }
}
describe('Component', function () {
    it('should be comparable with Diff', function () {
        let oldComponentNode = (Cascade_1.default.createElement(OldComponent, null));
        let newComponentNode = (Cascade_1.default.createElement(NewComponent, null));
        var diff = Diff_1.default.compare(oldComponentNode.toComponent().root.children, newComponentNode.toComponent().root.children, (newNode, oldNode) => {
            var output = false;
            if (newNode && oldNode) {
                if (newNode.type == oldNode.type) {
                    output = true;
                }
            }
            return output;
        });
        var nodesToAdd = [];
        var nodesToRemove = [];
        var nodesToLeave = [];
        for (var index = 0, length = diff.length; index < length; index++) {
            var diffItem = diff[index];
            switch (diffItem.operation) {
                case Diff_1.DiffOperation.REMOVE:
                    nodesToRemove.push(diffItem.item);
                    break;
                case Diff_1.DiffOperation.NONE:
                    nodesToLeave.push(diffItem.item);
                    break;
                case Diff_1.DiffOperation.ADD:
                    nodesToAdd.push(diffItem.item);
                    break;
            }
        }
        expect(nodesToAdd.length).toBe(1);
        expect(nodesToRemove.length).toBe(1);
        expect(nodesToLeave.length).toBe(0);
        expect(nodesToAdd[0].type).toBe('div');
        expect(nodesToRemove[0].type).toBe('span');
    });
});
//# sourceMappingURL=Component_Test9.test.js.map