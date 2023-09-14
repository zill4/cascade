import { IObservable, ISubscriber, ISubscriberFunction } from './IObservable';
export interface ObservableIndex {
    [index: string]: IObservable<any>;
}
export default class Graph<T = any> {
    parent: any;
    observables: ObservableIndex;
    constructor(parent?: any);
    peek<U extends keyof T>(property: U): T[U];
    peekDirty<U extends keyof T>(property: U): T[U];
    track<U extends keyof T>(property: U): Promise<void>;
    trackAll(): Promise<void[]>;
    getReferences<U extends keyof T>(property: U): IObservable<any>[];
    getSubscribers<U extends keyof T>(property: U): (ISubscriber | ISubscriberFunction<T[U]>)[];
    dispose(): void;
    disposeAll(): void;
    subscribe<U extends keyof T>(property: U, subscriber: ISubscriber | ISubscriberFunction<any>): any;
    subscribeOnly<U extends keyof T>(property: U, subscriber: ISubscriber | ISubscriberFunction<any>): any;
    unsubscribe<U extends keyof T>(property: U, subscriber: ISubscriber | ISubscriberFunction<any>): void;
    setAlwaysNotify<U extends keyof T>(property: U, alwaysNotify: boolean): void;
}
//# sourceMappingURL=Graph.d.ts.map