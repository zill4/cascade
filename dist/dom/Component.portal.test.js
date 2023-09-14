Object.defineProperty(exports, "__esModule", { value: true });
const Cascade_1 = require("../cascade/Cascade");
const Component_1 = require("./Component");
const Portal_1 = require("./Portal");
describe('Component.portal', () => {
    it('should render Components to specified Element', async () => {
        var container = document.createElement('div');
        var portalContainer = document.createElement('div');
        class Parent extends Component_1.Component {
            render() {
                return (Cascade_1.default.createElement("div", null,
                    Cascade_1.default.createElement(Child, null)));
            }
        }
        class Child extends Component_1.Component {
            render() {
                return (Cascade_1.default.createElement(Portal_1.default, { element: portalContainer },
                    Cascade_1.default.createElement("div", null, "Child")));
            }
        }
        var root = Cascade_1.default.createElement(Parent, null);
        var container = document.createElement('div');
        Cascade_1.default.render(container, root);
        expect(container.childNodes[0].textContent).toBe('');
        expect(portalContainer.childNodes[0].textContent).toBe('Child');
    });
});
//# sourceMappingURL=Component.portal.test.js.map