Object.defineProperty(exports, "__esModule", { value: true });
exports.CascadeError = void 0;
var CascadeError;
(function (CascadeError) {
    CascadeError["NoRootNode"] = "Could not find root node";
    CascadeError["InvalidRootRender"] = "Root render is not a Node.  Nothing was rendered, and nothing will be updated";
    CascadeError["NoObservable"] = "No observable attached to Object: ";
    CascadeError["NoOldComponent"] = "Old Component has never been rendered";
    CascadeError["TimeoutElapsed"] = "Timeout elapsed";
})(CascadeError || (exports.CascadeError = CascadeError = {}));
//# sourceMappingURL=CascadeError.js.map