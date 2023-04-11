import { IServiceProvider, IStorageLayer, StringifiedType, TorusStorageLayerAPIParams, TorusStorageLayerArgs } from "@tkey/common-types";
import BN from "bn.js";
declare class TorusStorageLayer implements IStorageLayer {
    enableLogging: boolean;
    hostUrl: string;
    storageLayerName: string;
    serverTimeOffset: number;
    constructor({ enableLogging, hostUrl, serverTimeOffset }: TorusStorageLayerArgs);
    static serializeMetadataParamsInput(el: unknown, serviceProvider: IServiceProvider, privKey: BN): Promise<unknown>;
    static fromJSON(value: StringifiedType): TorusStorageLayer;
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
    generateMetadataParams(message: unknown, serviceProvider?: IServiceProvider, privKey?: BN): TorusStorageLayerAPIParams;
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
export default TorusStorageLayer;
