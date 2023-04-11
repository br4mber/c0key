/// <reference types="node" />
import { BNString, CatchupToLatestShareResult, DeleteShareResult, EncryptedMessage, FactorEnc, FromJSONConstructor, GenerateNewShareResult, IMetadata, InitializeNewKeyResult, InitializeNewTSSKeyResult, IServiceProvider, IStorageLayer, ITKey, ITKeyApi, KeyDetails, LocalMetadataTransitions, LocalTransitionData, ModuleMap, Point, PointHex, Polynomial, PolynomialID, ReconstructedKeyResult, ReconstructKeyMiddlewareMap, RefreshMiddlewareMap, RefreshSharesResult, ShareSerializationMiddleware, ShareStore, ShareStoreMap, ShareStorePolyIDShareIndexMap, StringifiedType, TKeyArgs, TkeyStoreItemType } from "@tkey/common-types";
import BN from "bn.js";
import AuthMetadata from "./authMetadata";
import Metadata from "./metadata";
declare class ThresholdKey implements ITKey {
    modules: ModuleMap;
    enableLogging: boolean;
    serviceProvider: IServiceProvider;
    storageLayer: IStorageLayer;
    shares: ShareStorePolyIDShareIndexMap;
    privKey: BN;
    lastFetchedCloudMetadata: Metadata;
    metadata: Metadata;
    manualSync: boolean;
    tssTag: string;
    _localMetadataTransitions: LocalMetadataTransitions;
    _refreshMiddleware: RefreshMiddlewareMap;
    _reconstructKeyMiddleware: ReconstructKeyMiddlewareMap;
    _shareSerializationMiddleware: ShareSerializationMiddleware;
    storeDeviceShare: (deviceShareStore: ShareStore, customDeviceInfo?: StringifiedType) => Promise<void>;
    haveWriteMetadataLock: string;
    constructor(args?: TKeyArgs);
    static fromJSON(value: StringifiedType, args: TKeyArgs): Promise<ThresholdKey>;
    getStorageLayer(): IStorageLayer;
    getMetadata(): IMetadata;
    initialize(params?: {
        withShare?: ShareStore;
        importKey?: BN;
        neverInitializeNewKey?: boolean;
        transitionMetadata?: Metadata;
        previouslyFetchedCloudMetadata?: Metadata;
        previousLocalMetadataTransitions?: LocalMetadataTransitions;
        delete1OutOf1?: boolean;
        useTSS?: boolean;
        deviceTSSShare?: BN;
        deviceTSSIndex?: number;
        factorPub?: Point;
    }): Promise<KeyDetails>;
    getFactorEncs(factorPub: Point): FactorEnc;
    /**
     * getTSSShare accepts a factorKey and returns the TSS share based on the factor encrypted TSS shares in the metadata
     * @param factorKey - factor key
     */
    getTSSShare(factorKey: BN, opts?: {
        threshold: number;
    }): Promise<{
        tssIndex: number;
        tssShare: BN;
    }>;
    getTSSCommits(): Point[];
    getTSSPub(): Point;
    /**
     * catchupToLatestShare recursively loops fetches metadata of the provided share and checks if there is an encrypted share for it.
     * @param shareStore - share to start of with
     * @param polyID - if specified, polyID to refresh to if it exists
     */
    catchupToLatestShare(params: {
        shareStore: ShareStore;
        polyID?: PolynomialID;
        includeLocalMetadataTransitions?: boolean;
    }): Promise<CatchupToLatestShareResult>;
    reconstructKey(_reconstructKeyMiddleware?: boolean): Promise<ReconstructedKeyResult>;
    reconstructLatestPoly(): Polynomial;
    deleteShare(shareIndex: BNString, useTSS?: boolean, tssOptions?: {
        inputTSSShare: BN;
        inputTSSIndex: number;
        factorPub: Point;
        authSignatures: string[];
        selectedServers?: number[];
    }): Promise<DeleteShareResult>;
    _getTSSNodeDetails(): Promise<{
        serverEndpoints: string[];
        serverPubKeys: PointHex[];
        serverThreshold: number;
    }>;
    _getRssNodeDetails(): Promise<{
        serverEndpoints: string[];
        serverPubKeys: PointHex[];
        serverThreshold: number;
    }>;
    generateNewShare(useTSS?: boolean, tssOptions?: {
        inputTSSShare: BN;
        inputTSSIndex: number;
        newFactorPub: Point;
        newTSSIndex: number;
        authSignatures?: string[];
        selectedServers?: number[];
    }): Promise<GenerateNewShareResult>;
    _refreshTSSShares(updateMetadata: boolean, inputShare: BN, inputIndex: number, factorPubs: Point[], targetIndexes: number[], verifierNameVerifierId: string, serverOpts: {
        serverEndpoints: string[];
        serverPubKeys: PointHex[];
        serverThreshold: number;
        selectedServers: number[];
        authSignatures: string[];
    }): Promise<void>;
    _refreshShares(threshold: number, newShareIndexes: string[], previousPolyID: PolynomialID, useTSS?: boolean, tssIndex?: number, factorPub?: Point): Promise<RefreshSharesResult>;
    _initializeNewTSSKey(tssTag: string, deviceTSSShare: any, factorPub: any, deviceTSSIndex?: any): Promise<InitializeNewTSSKeyResult>;
    _initializeNewKey({ determinedShare, initializeModules, importedKey, delete1OutOf1, }?: {
        determinedShare?: BN;
        initializeModules?: boolean;
        importedKey?: BN;
        delete1OutOf1?: boolean;
    }): Promise<InitializeNewKeyResult>;
    addLocalMetadataTransitions(params: {
        input: LocalTransitionData;
        serviceProvider?: IServiceProvider;
        privKey?: BN[];
        acquireLock?: boolean;
    }): Promise<void>;
    syncLocalMetadataTransitions(): Promise<void>;
    updateSDK(params?: {
        withShare?: ShareStore;
    }): Promise<ThresholdKey>;
    inputShareStore(shareStore: ShareStore): void;
    inputShareStoreSafe(shareStore: ShareStore, autoUpdateMetadata?: boolean): Promise<void>;
    outputShareStore(shareIndex: BNString, polyID?: string): ShareStore;
    _setKey(privKey: BN): void;
    getCurrentShareIndexes(): string[];
    getKeyDetails(): KeyDetails;
    generateAuthMetadata(params: {
        input: Metadata[];
    }): AuthMetadata[];
    setAuthMetadata(params: {
        input: Metadata;
        serviceProvider?: IServiceProvider;
        privKey?: BN;
    }): Promise<{
        message: string;
    }>;
    setAuthMetadataBulk(params: {
        input: Metadata[];
        serviceProvider?: IServiceProvider;
        privKey?: BN[];
    }): Promise<void>;
    getAuthMetadata(params: {
        serviceProvider?: IServiceProvider;
        privKey?: BN;
        includeLocalMetadataTransitions?: boolean;
    }): Promise<Metadata>;
    getGenericMetadataWithTransitionStates(params: {
        fromJSONConstructor: FromJSONConstructor;
        serviceProvider?: IServiceProvider;
        privKey?: BN;
        includeLocalMetadataTransitions?: boolean;
        _localMetadataTransitions?: LocalMetadataTransitions;
    }): Promise<unknown>;
    acquireWriteMetadataLock(): Promise<number>;
    releaseWriteMetadataLock(): Promise<void>;
    _syncShareMetadata(adjustScopedStore?: (ss: unknown) => unknown): Promise<void>;
    syncMultipleShareMetadata(shares: BN[], adjustScopedStore?: (ss: unknown) => unknown): Promise<void>;
    _addRefreshMiddleware(moduleName: string, middleware: (generalStore: unknown, oldShareStores: ShareStoreMap, newShareStores: ShareStoreMap) => unknown): void;
    _addReconstructKeyMiddleware(moduleName: string, middleware: () => Promise<BN[]>): void;
    _addShareSerializationMiddleware(serialize: (share: BN, type: string) => Promise<unknown>, deserialize: (serializedShare: unknown, type: string) => Promise<BN>): void;
    _setDeviceStorage(storeDeviceStorage: (deviceShareStore: ShareStore) => Promise<void>): void;
    addShareDescription(shareIndex: string, description: string, updateMetadata?: boolean): Promise<void>;
    deleteShareDescription(shareIndex: string, description: string, updateMetadata?: boolean): Promise<void>;
    updateShareDescription(shareIndex: string, oldDescription: string, newDescription: string, updateMetadata?: boolean): Promise<void>;
    encrypt(data: Buffer): Promise<EncryptedMessage>;
    decrypt(encryptedMessage: EncryptedMessage): Promise<Buffer>;
    _setTKeyStoreItem(moduleName: string, data: TkeyStoreItemType): Promise<void>;
    _deleteTKeyStoreItem(moduleName: string, id: string): Promise<void>;
    getTKeyStore(moduleName: string): Promise<TkeyStoreItemType[]>;
    getTKeyStoreItem(moduleName: string, id: string): Promise<TkeyStoreItemType>;
    outputShare(shareIndex: BNString, type?: string): Promise<unknown>;
    inputShare(share: unknown, type?: string): Promise<void>;
    toJSON(): StringifiedType;
    getAllShareStoresForLatestPolynomial(): ShareStore[];
    CRITICAL_deleteTkey(): Promise<void>;
    getApi(): ITKeyApi;
    private setModuleReferences;
    private initializeModules;
}
export default ThresholdKey;
