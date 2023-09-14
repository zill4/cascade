Object.defineProperty(exports, "__esModule", { value: true });
exports.wait = void 0;
function wait(time) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, time);
    });
}
exports.wait = wait;
//# sourceMappingURL=PromiseUtil.js.map