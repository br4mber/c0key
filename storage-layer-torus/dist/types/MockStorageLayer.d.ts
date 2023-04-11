import { IServiceProvider, IStorageLayer, MockStorageLayerArgs, StringifiedType } from "@tkey/common-types";
import BN from "bn.js";
declare class MockStorageLayer implements IStorageLayer {
    dataMap: {
        [key: string]: unknown;
    };
    storageLayerName: string;
    lockMap: {
        [key: string]: string;
    };
    serviceProvider: IServiceProvider;
    constructor({ dataMap, lockMap }?: MockStorageLayerArgs);
    static fromJSON(value: StringifiedType): MockStorageLayer;
    /**
     *  Get metadata for a key
     * @param privKey - If not provided, it will use service provider's share for decryption
     */
    getMetadata<T>(params: {
        serviceProvider?: IServiceProvider;
        privKey?: BN;
    }): Promise<T>;
    /**
     * Set Metadata for a key
     * @param input - data to post
     * @param privKey - If not provided, it will use service provider's share for encryption
     */
    setMetadata<T>(params: {
        input: T;
        serviceProvider?: IServiceProvider;
        privKey?: BN;
    }): Promise<{
        message: string;
    }>;
    setMetadataStream<T>(params: {
        input: Array<T>;
        serviceProvider?: IServiceProvider;
        privKey?: Array<BN>;
    }): Promise<{
        message: string;
    }>;
    acquireWriteLock(params: {
        serviceProvider?: IServiceProvider;
        privKey?: BN;
    }): Promise<{
        status: number;
        id?: string;
    }>;
    releaseWriteLock(params: {
        id: string;
        serviceProvider?: IServiceProvider;
        privKey?: BN;
    }): Promise<{
        status: number;
    }>;
    toJSON(): StringifiedType;
}
export default MockStorageLayer;
