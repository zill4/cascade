import { IObservable } from '../modules/Cascade';
export type ObservableFactory<T> = {
    (value: T, thisArg: any): IObservable<T>;
};
export default class DecoratorUtil {
    static createObservableIfNotExists<T>(obj: any, property: string, factory: ObservableFactory<T>, value?: T, set?: boolean, thisArg?: any): IObservable<T>;
    static attachObservable<T>(target: any, propertyKey: string, factory: ObservableFactory<T>, readOnly?: boolean): void;
}
//# sourceMappingURL=DecoratorUtil.d.ts.map