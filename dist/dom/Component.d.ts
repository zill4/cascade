import VirtualNode from './VirtualNode';
import ComponentNode from './ComponentNode';
import { IVirtualNode, IVirtualNodeProps } from './IVirtualNode';
export interface IComponentContext {
    componentContexts: ComponentNode<IVirtualNodeProps>[][];
    context: ComponentNode<IVirtualNodeProps>[];
}
export declare abstract class Component<T> implements IVirtualNode<T> {
    uniqueId: number;
    props: T & IVirtualNodeProps;
    prevProps: T & IVirtualNodeProps;
    children: any;
    key: string | number;
    root: any;
    element: Node;
    context: ComponentNode<any>[];
    oldContext: ComponentNode<any>[];
    mounted: boolean;
    rendered: boolean;
    portal: boolean;
    constructor(props?: T & IVirtualNodeProps, children?: any[]);
    storeProps(props?: T & IVirtualNodeProps, children?: any[]): void;
    build(): any;
    init(): void;
    update(props?: T & IVirtualNodeProps, children?: any[]): this["root"];
    abstract render(): any;
    toNode(namespace?: string, oldRoot?: any): Node;
    dispose(): void;
    disposeContext(): void;
    afterProps(updating: boolean): void;
    beforeRender(updating: boolean): void;
    afterRender(node: Node, updating: boolean): void;
    afterDispose(node: Node): void;
    diffFragments(newRootComponentNode: ComponentNode<IVirtualNodeProps>, oldRootComponentNode: ComponentNode<IVirtualNodeProps>, oldElement: Node, namespace: string, offsetIndex?: number): Node;
    diffComponents(newRootComponentNode: ComponentNode<IVirtualNodeProps>, oldRootComponentNode: ComponentNode<IVirtualNodeProps>, namespace: string): Node;
    diffVirtualNodes(newRoot: VirtualNode<IVirtualNodeProps>, oldRoot: VirtualNode<IVirtualNodeProps>, oldElement: HTMLElement, namespace: string, offsetIndex?: number): HTMLElement;
    getChildLength(): any;
    static getContext(): ComponentNode<IVirtualNodeProps>[];
    static pushContext(): ComponentNode<IVirtualNodeProps>[];
    static popContext(): ComponentNode<IVirtualNodeProps>[];
}
//# sourceMappingURL=Component.d.ts.map