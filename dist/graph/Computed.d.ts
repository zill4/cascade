import { IObservable, ISubscriber } from './IObservable';
import Observable from './Observable';
export default class Computed<T> extends Observable<T> implements ISubscriber {
    references: IObservable<any>[];
    definition: (n?: T) => T;
    setter: (n: T) => any;
    thisArg: any;
    dirty: boolean;
    disposed: boolean;
    error: Error;
    constructor(definition: (n?: T) => T, defer?: boolean, thisArg?: any, setter?: (n: T) => any);
    getValue(): T;
    update(): T;
    peek(): T;
    peekDirty(): T;
    setValue(value: T): Promise<void>;
    notify(): Promise<void>;
    notifyDirty(): void;
    runUpdate(): Promise<T>;
    runOnly(): T;
    runDefinition(definition: (n: T) => T): T;
    dispose(recursive?: boolean): void;
}
//# sourceMappingURL=Computed.d.ts.map