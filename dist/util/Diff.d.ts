export default class Diff {
    static createTable<T>(m: number, n: number): T[][];
    static compare<T>(x: T[], y: T[], comparison?: (x: T, y: T) => boolean): IDiffItem<T>[];
    static compare(x: string, y: string, comparison?: (x: string, y: string) => boolean): IDiffItem<string>[];
    static max(a: number, b: number): number;
    static compareHash(x: Object, y: Object): {};
}
export declare enum DiffOperation {
    REMOVE = -1,
    NONE = 0,
    ADD = 1
}
export interface IDiffItem<T> {
    item: T;
    itemB?: T;
    operation: DiffOperation;
}
//# sourceMappingURL=Diff.d.ts.map