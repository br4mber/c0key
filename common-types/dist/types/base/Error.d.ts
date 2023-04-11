import { CustomError } from "ts-custom-error";
export interface ITkeyError extends CustomError {
    name: string;
    code: number;
    message: string;
    toString(): string;
}
export type ErrorCodes = {
    [key: number]: string;
};
export declare abstract class TkeyError extends CustomError implements ITkeyError {
    code: number;
    message: string;
    constructor(code?: number, message?: string);
    toJSON(): ITkeyError;
    toString(): string;
}
