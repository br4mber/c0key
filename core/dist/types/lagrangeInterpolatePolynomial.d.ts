import { Point, Polynomial, Share } from "@tkey/common-types";
import BN from "bn.js";
export declare function lagrangeInterpolatePolynomial(points: Array<Point>): Polynomial;
export declare function lagrangeInterpolation(shares: BN[], nodeIndex: BN[]): BN;
export declare function generateRandomPolynomial(degree: number, secret?: BN, deterministicShares?: Array<Share>): Polynomial;
export declare function polyCommitmentEval(polyCommitments: Array<Point>, index: BN): Point;
export declare function dotProduct(arr1: BN[], arr2: BN[], modulus?: BN): BN;
export declare const kCombinations: (s: number | number[], k: number) => number[][];
export declare function getLagrangeCoeffs(_allIndexes: any, _myIndex: any, _target?: number): BN;
