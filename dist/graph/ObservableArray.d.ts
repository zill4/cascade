import Observable from './Observable';
import { IArray } from './IObservable';
export default class ObservableArray<T> extends Observable<IArray<T>> {
    private _innerValue;
    constructor(value?: Array<T>);
    wrapArray(value: Array<T>): ProxyArray<any>;
    setValue(value?: Array<T>): Promise<void>;
}
export declare class ProxyArray<T> extends Array<T> implements IArray<T> {
    constructor(value?: Array<T>, containingObservable?: Observable<Array<T>>);
}
//# sourceMappingURL=ObservableArray.d.ts.map