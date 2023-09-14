import { IVirtualNode, IVirtualNodeProps } from './IVirtualNode';
import { Component } from './Component';
export default class ComponentNode<T> implements IVirtualNode<T> {
    componentConstructor: new (props?: T, children?: any[]) => Component<T>;
    props: T & IVirtualNodeProps;
    children: any;
    key: string | number;
    component: Component<T>;
    constructor(componentConstructor: new (props?: T & IVirtualNodeProps, children?: any[]) => Component<T>, props?: T, children?: Array<any>);
    toComponent(): Component<T>;
    toNode(namespace: string): Node;
    dispose(): void;
}
//# sourceMappingURL=ComponentNode.d.ts.map