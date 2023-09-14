import Computed from './Computed';
export interface ComputedHash {
    [index: string]: Computed<any>;
}
export default class ComputedQueue {
    items: Computed<any>[];
    hash: ComputedHash;
    scheduled: boolean;
    completed: boolean;
    promise: Promise<void>;
    static computedQueue: ComputedQueue;
    constructor();
    add(computed: Computed<any>): Promise<void>;
}
//# sourceMappingURL=ComputedQueue.d.ts.map