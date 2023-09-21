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
var runsParent = 0;
var runsChild = 0;
var childObservable = undefined;
var childStatic = undefined;
class Child {
    get abcd() {
        runsChild++;
        return this.parent.a + this.parent.b + this.c + this.d;
    }
    constructor(parent) {
        this.c = 1;
        this.d = 2;
        Object.defineProperty(this, 'parent', {
            writable: true,
            configurable: true,
            enumerable: false,
        });
        this.parent = parent;
        var abcd = this.abcd;
    }
}
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Object)
], Child.prototype, "c", void 0);
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Object)
], Child.prototype, "d", void 0);
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Child.prototype, "abcd", null);
class Parent {
    get ab() {
        runsParent++;
        return this.a + this.b;
    }
    constructor() {
        this.a = 1;
        this.b = 2;
        var ab = this.ab;
        childObservable = new Child(this);
        childStatic = new Child(this);
        this.childObservable = childObservable;
        this.childStatic = childStatic;
    }
}
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Object)
], Parent.prototype, "a", void 0);
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Object)
], Parent.prototype, "b", void 0);
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Parent.prototype, "ab", null);
__decorate([
    Decorators_1.observable,
    __metadata("design:type", Child)
], Parent.prototype, "childObservable", void 0);
describe('Graph.dispose', function () {
    it('should dispose observables recursively', function () {
        var model = new Parent();
        Cascade_1.default.disposeAll(model);
        expect(model._graph.observables.a.subscribers.length).toBe(0);
        expect(model._graph.observables.b.subscribers.length).toBe(0);
        expect(runsParent).toBe(1);
        expect(runsChild).toBe(2);
    });
});
//# sourceMappingURL=graph_Test6.test.js.map