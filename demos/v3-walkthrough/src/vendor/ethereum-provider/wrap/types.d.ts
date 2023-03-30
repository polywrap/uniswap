import * as Types from "./";
export declare type UInt = number;
export declare type UInt8 = number;
export declare type UInt16 = number;
export declare type UInt32 = number;
export declare type Int = number;
export declare type Int8 = number;
export declare type Int16 = number;
export declare type Int32 = number;
export declare type Bytes = Uint8Array;
export declare type BigInt = string;
export declare type BigNumber = string;
export declare type Json = string;
export declare type String = string;
export declare type Boolean = boolean;
export interface Env extends Record<string, unknown> {
    connection?: Types.Connection | null;
}
export interface Connection {
    node?: Types.String | null;
    networkNameOrChainId?: Types.String | null;
}
