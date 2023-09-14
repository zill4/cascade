import { IObservable, ISubscriber, ISubscriberFunction } from './IObservable';
export interface IObservableContext {
    computedContexts: IObservable<any>[][];
    context: IObservable<any>[];
}
export default class Observable<T> implements IObservable<T> {
    id: number;
    value: T;
    subscribers: (ISubscriber | ISubscriberFunction<T>)[];
    alwaysNotify: boolean;
    protected promise: Promise<void>;
    static id: number;
    constructor(value?: T);
    getValue(): T;
    peek(): T;
    peekDirty(): T;
    track(): Promise<void>;
    setValue(value: T): Promise<void>;
    subscribeOnly(subscriber: ISubscriber | ISubscriberFunction<T>): void;
    subscribe(subscriber: ISubscriber | ISubscriberFunction<T>): void;
    unsubscribe(subscriber: ISubscriber | ISubscriberFunction<T>): void;
    publish(value: T, oldValue?: T): Promise<void>;
    dispose(recursive?: boolean): void;
    static getContext(): IObservable<any>[];
    static pushContext(): IObservable<any>[];
    static popContext(): IObservable<any>[];
}
//# sourceMappingURL=Observable.d.ts.map