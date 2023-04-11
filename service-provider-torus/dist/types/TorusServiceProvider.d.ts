import { Point, PointHex, StringifiedType, TorusServiceProviderArgs } from "@tkey/common-types";
import { ServiceProviderBase } from "@tkey/service-provider-base";
import CustomAuth, { AggregateLoginParams, CustomAuthArgs, HybridAggregateLoginParams, InitParams, SubVerifierDetails, TorusAggregateLoginResponse, TorusHybridAggregateLoginResponse, TorusLoginResponse } from "@toruslabs/customauth";
import BN from "bn.js";
declare class TorusServiceProvider extends ServiceProviderBase {
    directWeb: CustomAuth;
    singleLoginKey: BN;
    customAuthArgs: CustomAuthArgs;
    verifierType?: "normal" | "aggregate" | "hybrid";
    constructor({ enableLogging, postboxKey, customAuthArgs, nodeEndpoints, nodePubKeys, useTSS }: TorusServiceProviderArgs);
    static fromJSON(value: StringifiedType): TorusServiceProvider;
    init(params: InitParams): Promise<void>;
    _setTSSPubKey(tssTag: string, tssNonce: number, tssPubKey: Point): void;
    retrieveVerifierId(): string;
    _setTSSNodeDetails(serverEndpoints: string[], serverPubKeys: PointHex[], serverThreshold: number): void;
    getTSSNodeDetails(): Promise<{
        serverEndpoints: string[];
        serverPubKeys: PointHex[];
        serverThreshold: number;
    }>;
    getSSSNodeDetails(): Promise<{
        serverEndpoints: string[];
        serverPubKeys: PointHex[];
        serverThreshold: number;
    }>;
    getRSSNodeDetails(): Promise<{
        serverEndpoints: string[];
        serverPubKeys: PointHex[];
        serverThreshold: number;
    }>;
    getTSSPubKey(tssTag: string, tssNonce: number): Promise<Point>;
    triggerLogin(params: SubVerifierDetails): Promise<TorusLoginResponse>;
    triggerAggregateLogin(params: AggregateLoginParams): Promise<TorusAggregateLoginResponse>;
    triggerHybridAggregateLogin(params: HybridAggregateLoginParams): Promise<TorusHybridAggregateLoginResponse>;
    toJSON(): StringifiedType;
}
export default TorusServiceProvider;
