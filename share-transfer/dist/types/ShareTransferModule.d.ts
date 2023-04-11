import { IModule, ITKeyApi, ITkeyError, ShareStore, ShareStoreMap } from "@tkey/common-types";
import BN from "bn.js";
import ShareRequest from "./ShareRequest";
import ShareTransferStorePointer from "./ShareTransferStorePointer";
export type ShareTransferStore = {
    [encPubKeyX: string]: ShareRequest;
};
export declare const SHARE_TRANSFER_MODULE_NAME = "shareTransfer";
declare class ShareTransferModule implements IModule {
    moduleName: string;
    tbSDK: ITKeyApi;
    currentEncKey: BN;
    requestStatusCheckId: number;
    requestStatusCheckInterval: number;
    constructor();
    static refreshShareTransferMiddleware(generalStore: unknown, oldShareStores: ShareStoreMap, newShareStores: ShareStoreMap): ShareTransferStorePointer;
    setModuleReferences(tbSDK: ITKeyApi): void;
    setRequestStatusCheckInterval(interval: number): void;
    initialize(): Promise<void>;
    requestNewShare(userAgent: string, availableShareIndexes: Array<string>, callback?: (err?: ITkeyError, shareStore?: ShareStore) => void): Promise<string>;
    addCustomInfoToShareRequest(encPubKeyX: string, customInfo: string): Promise<void>;
    lookForRequests(): Promise<Array<string>>;
    approveRequest(encPubKeyX: string, shareStore?: ShareStore): Promise<void>;
    approveRequestWithShareIndex(encPubKeyX: string, shareIndex: string): Promise<void>;
    getShareTransferStore(): Promise<ShareTransferStore>;
    setShareTransferStore(shareTransferStore: ShareTransferStore): Promise<void>;
    startRequestStatusCheck(encPubKeyX: string, deleteRequestAfterCompletion: boolean): Promise<ShareStore>;
    cancelRequestStatusCheck(): Promise<void>;
    deleteShareTransferStore(encPubKey: string): Promise<void>;
    resetShareTransferStore(): Promise<void>;
    private _cleanUpCurrentRequest;
}
export default ShareTransferModule;
