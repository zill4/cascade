import { Component } from "./Component";
export interface IPortalProps {
    element: HTMLElement;
    remove?: boolean;
}
export default class Portal extends Component<IPortalProps> {
    portal: boolean;
    render(): JSX.Element;
    afterRender(node: Node, updated: boolean): void;
    afterDispose(node: Node): void;
}
//# sourceMappingURL=Portal.d.ts.map