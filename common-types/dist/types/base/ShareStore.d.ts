import { ISerializable, PolynomialID, StringifiedType } from "../baseTypes/commonTypes";
import Share from "./Share";
declare class ShareStore implements ISerializable {
    share: Share;
    polynomialID: PolynomialID;
    constructor(share: Share, polynomialID: PolynomialID);
    static fromJSON(value: StringifiedType): ShareStore;
    toJSON(): StringifiedType;
}
export type EncryptedShareStore = {
    [shareCommitment: string]: ShareStore;
};
export type ShareStoreMap = {
    [shareIndex: string]: ShareStore;
};
export type ShareStorePolyIDShareIndexMap = {
    [polynomialID: string]: ShareStoreMap;
};
export default ShareStore;
