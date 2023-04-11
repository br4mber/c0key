import BN from "bn.js";
import { BNString, ISerializable, StringifiedType } from "../baseTypes/commonTypes";
import Point from "./Point";
declare class PublicShare implements ISerializable {
    shareCommitment: Point;
    shareIndex: BN;
    constructor(shareIndex: BNString, shareCommitment: Point);
    static fromJSON(value: StringifiedType): PublicShare;
    toJSON(): StringifiedType;
}
export default PublicShare;
type PublicShareShareIndexMap = {
    [shareIndex: string]: PublicShare;
};
export type PublicSharePolyIDShareIndexMap = {
    [polynomialID: string]: PublicShareShareIndexMap;
};
