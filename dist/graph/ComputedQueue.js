Object.defineProperty(exports, "__esModule", { value: true });
class ComputedQueue {
    constructor() {
        this.items = [];
        this.hash = {};
        this.scheduled = false;
        this.completed = false;
    }
    add(computed) {
        if (!this.hash[computed.id]) {
            this.hash[computed.id] = computed;
            this.items.push(computed);
            if (!this.scheduled) {
                this.scheduled = true;
                this.promise = new Promise((resolve) => {
                    window.setTimeout(async () => {
                        this.completed = true;
                        await Promise.all(this.items.map(computed => computed.runUpdate()));
                        resolve();
                    }, 0);
                });
            }
            return this.promise;
        }
        else {
            return this.promise;
        }
    }
}
ComputedQueue.computedQueue = new ComputedQueue();
exports.default = ComputedQueue;
//# sourceMappingURL=ComputedQueue.js.map