import BN from "bn.js";
import type { curve, ec } from "elliptic";
import { BNString } from "../baseTypes/commonTypes";
import Point from "./Point";
export declare const toPrivKeyEC: (bn: BN) => ec.KeyPair;
export declare const toPrivKeyECC: (bn: BNString) => Buffer;
export declare const getPubKeyEC: (bn: BN) => curve.base.BasePoint;
export declare const getPubKeyECC: (bn: BN) => Buffer;
export declare const getPubKeyPoint: (bn: BN) => Point;
