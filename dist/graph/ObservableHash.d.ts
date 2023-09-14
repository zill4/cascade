import Observable from './Observable';
import { IHash } from './IObservable';
export default class ObservableHash<T> extends Observable<IHash<T>> {
    private _innerValue;
    constructor(value?: IHash<T>);
    wrapHash(value: IHash<T>): ProxyHash<T>;
    setValue(value?: IHash<T>): Promise<void>;
}
export declare class ProxyHash<T> implements IHash<T> {
    [index: string]: T;
    constructor(value?: IHash<T>, containingObservable?: Observable<IHash<T>>);
}
//# sourceMappingURL=ObservableHash.d.ts.map