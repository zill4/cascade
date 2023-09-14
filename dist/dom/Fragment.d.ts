import { IVirtualNode, IVirtualNodeProps } from './IVirtualNode';
export default class Fragment implements IVirtualNode<IVirtualNodeProps> {
    type: string;
    children: any[];
    props: IVirtualNodeProps;
    key: string | number;
    element: Node;
    elementArray: Node[];
    constructor(props?: IVirtualNodeProps, children?: Array<any>);
    storeProps(props?: IVirtualNodeProps, children?: any[]): void;
    update(props?: IVirtualNodeProps, children?: Array<any>): void;
    toNode(): DocumentFragment;
    toString(): string;
    dispose(): void;
    getChildLength(): number;
}
//# sourceMappingURL=Fragment.d.ts.map