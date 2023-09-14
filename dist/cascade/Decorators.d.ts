export declare function array<T>(target: any, propertyKey: string): any;
export declare function hash<T>(target: any, propertyKey: string): any;
export declare function observable<T>(target: any, propertyKey: string, descriptor?: TypedPropertyDescriptor<T>): any;
export declare function computed<T>(definition: (n?: T) => T, setter?: (n: T) => any): (target: any, propertyKey: string, descriptor?: TypedPropertyDescriptor<T>) => any;
//# sourceMappingURL=Decorators.d.ts.map