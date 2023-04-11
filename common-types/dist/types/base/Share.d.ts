import BN from "bn.js";
import { BNString, ISerializable, StringifiedType } from "../baseTypes/commonTypes";
import PublicShare from "./PublicShare";
declare class Share implements ISerializable {
    share: BN;
    shareIndex: BN;
    constructor(shareIndex: BNString, share: BNString);
    static fromJSON(value: StringifiedType): Share;
    getPublicShare(): PublicShare;
    toJSON(): StringifiedType;
}
export default Share;
