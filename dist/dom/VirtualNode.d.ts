import { IVirtualNode, IVirtualElementProps } from './IVirtualNode';
export default class VirtualNode<T> implements IVirtualNode<T> {
    type: string;
    props: T & IVirtualElementProps;
    children: any[];
    key: string | number;
    element: Node;
    constructor(type: string, props?: T & IVirtualElementProps, children?: Array<any>);
    toNode(namespace?: string): HTMLElement;
    toString(): string;
    static fixChildrenArrays(children: Array<any>, fixedChildren?: any[]): any[];
    static createCssText(style: Partial<CSSStyleDeclaration>): string;
    static setAttribute(element: HTMLElement, property: string, value: any, namespace?: string): void;
    static removeAttribute(element: HTMLElement, property: string, namespace?: string): void;
}
//# sourceMappingURL=VirtualNode.d.ts.map