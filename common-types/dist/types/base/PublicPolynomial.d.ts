import { ISerializable, PolynomialID, StringifiedType } from "../baseTypes/commonTypes";
import Point from "./Point";
declare class PublicPolynomial implements ISerializable {
    polynomialCommitments: Point[];
    polynomialId: PolynomialID;
    constructor(polynomialCommitments: Point[]);
    static fromJSON(value: StringifiedType): PublicPolynomial;
    getThreshold(): number;
    getPolynomialID(): PolynomialID;
    toJSON(): StringifiedType;
}
export type PublicPolynomialMap = {
    [polynomialID: string]: PublicPolynomial;
};
export default PublicPolynomial;
