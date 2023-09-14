import Graph from '../graph/Graph';
import { IObservable, ISubscriberFunction } from '../graph/IObservable';
import { IVirtualNode, IVirtualNodeProps } from '../dom/IVirtualNode';
import Fragment from '../dom/Fragment';
import { Component } from '../dom/Component';
export default class Cascade {
    static disposeAll<T>(obj: T): void;
    static attachGraph<T>(obj: T): Graph<T>;
    static createProperty<T, U extends keyof T>(obj: T, property: U, observable: IObservable<T[U]>): void;
    static attachObservable<T, U extends keyof T>(obj: T, property: U, observable: IObservable<T[U]>, readOnly?: boolean): void;
    static createObservable<T, U extends keyof T>(obj: T, property: U, value?: T[U]): void;
    static createComputed<T, U extends keyof T>(obj: T, property: U, definition: (n?: T[U]) => T[U], defer?: boolean, setter?: (n: T[U]) => any): void;
    static createObservableArray<T, U extends keyof T>(obj: T, property: U, value?: T[U]): void;
    static createObservableHash<T, U extends keyof T>(obj: T, property: U, value?: T[U]): void;
    static setAlwaysNotify<T, U extends keyof T>(obj: T, property: U, alwaysNotify: boolean): void;
    static subscribe<T, U extends keyof T>(obj: T, property: U, subscriberFunction: ISubscriberFunction<T[U]>, createDisposer?: boolean): () => void;
    static subscribeOnly<T, U extends keyof T>(obj: T, property: U, subscriberFunction: ISubscriberFunction<T[U]>, createDisposer?: boolean): () => void;
    static unsubscribe<T, U extends keyof T>(obj: T, property: U, subscriberFunction: ISubscriberFunction<T[U]>): void;
    static waitToEqual<T, U extends keyof T>(obj: T, property: U, testValue: T[U], timeout?: number): Promise<T[U]>;
    static peek<T, U extends keyof T>(obj: T, property: U): T[U];
    static peekDirty<T, U extends keyof T>(obj: T, property: U): T[U];
    static track<T, U extends keyof T>(obj: T, property: U): Promise<void>;
    static trackAll<T>(obj: T): Promise<void[]>;
    static update<T, U extends keyof T>(obj: T, property: U): T[U];
    static set<T, U extends keyof T>(obj: T, property: U, value: T[U]): Promise<void>;
    static run<T, U extends keyof T>(obj: T, property: U): T[U];
    static getObservable<T, U extends keyof T>(obj: T, property: U): IObservable<T[U]>;
    static getSubscribers<T, U extends keyof T>(obj: T, property: U): (import("../graph/IObservable").ISubscriber | ISubscriberFunction<T[U]>)[];
    static getReferences<T, U extends keyof T>(obj: T, property: U): IObservable<any>[];
    static wrapContext(callback: () => any, thisArg?: any): IObservable<any>[];
    static createElement<T extends IVirtualNodeProps>(type: string | (new (props: T, children: Array<any>) => Component<T>), props: T, ...children: Array<any>): IVirtualNode<T>;
    static render(node: HTMLElement | string, virtualNode: IVirtualNode<any>): Node;
    static Fragment: typeof Fragment;
    static reflectAvailable: boolean;
    static xlinkDeprecated: boolean;
}
//# sourceMappingURL=Cascade.d.ts.map