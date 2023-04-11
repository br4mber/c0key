/// <reference types="node" />
import { BNString, EncryptedMessage, IServiceProvider, Point, PointHex, PubKeyType, ServiceProviderArgs, StringifiedType } from "@tkey/common-types";
import BN from "bn.js";
import { curve } from "elliptic";
declare class ServiceProviderBase implements IServiceProvider {
    enableLogging: boolean;
    useTSS: boolean;
    tssPubKeys: Record<string, Point>;
    postboxKey: BN;
    serviceProviderName: string;
    verifierName?: string;
    verifierId?: string;
    tssNodeDetails: {
        serverEndpoints: string[];
        serverPubKeys: PointHex[];
        serverThreshold: number;
    };
    rssNodeDetails: {
        serverEndpoints: string[];
        serverPubKeys: PointHex[];
        serverThreshold: number;
    };
    sssNodeDetails: {
        serverEndpoints: string[];
        serverPubKeys: PointHex[];
        serverThreshold: number;
    };
    constructor({ enableLogging, postboxKey, useTSS }: ServiceProviderArgs);
    static fromJSON(value: StringifiedType): IServiceProvider;
    encrypt(msg: Buffer): Promise<EncryptedMessage>;
    decrypt(msg: EncryptedMessage): Promise<Buffer>;
    retrievePubKeyPoint(): curve.base.BasePoint;
    retrievePubKey(type: PubKeyType): Buffer;
    _setVerifierNameVerifierId(verifierName: string, verifierId: string): void;
    getVerifierNameVerifierId(): string;
    _setTSSNodeDetails(serverEndpoints: string[], serverPubKeys: PointHex[], serverThreshold: number): void;
    getTSSNodeDetails(): Promise<{
        serverEndpoints: string[];
        serverPubKeys: PointHex[];
        serverThreshold: number;
    }>;
    getRSSNodeDetails(): Promise<{
        serverEndpoints: string[];
        serverPubKeys: PointHex[];
        serverThreshold: number;
    }>;
    getSSSNodeDetails(): Promise<{
        serverEndpoints: string[];
        serverPubKeys: PointHex[];
        serverThreshold: number;
    }>;
    _setTSSPubKey(tssTag: string, tssNonce: number, tssPubKey: Point): void;
    getTSSPubKey(tssTag: string, tssNonce: number): Promise<Point>;
    sign(msg: BNString): string;
    toJSON(): StringifiedType;
}
export default ServiceProviderBase;
