/**
 * Base error class
 */
declare class BaseError extends Error {
    type: string;
    statusCode: number;
    isOperational: boolean;
    constructor(message: string, statusCode: number, type: string, isOperational: boolean);
}
/**
 * API error class
 */
declare class ApiError extends BaseError {
    constructor(message: string, statusCode: number, type: string);
}
/**
 * Check if error is an API specific error
 */
export declare const IsApiError: (err: any) => boolean;
export { ApiError };
export declare class NotFoundError extends ApiError {
    constructor(message?: string, type?: string);
}
export declare class BadRequestError extends ApiError {
    constructor(message?: string, type?: string);
}
export declare class ValidationError extends ApiError {
    constructor(message?: string, type?: string);
}
export declare class UnauthorizedError extends ApiError {
    constructor(message?: string, type?: string);
}
export declare class BadTokenError extends ApiError {
    constructor(message?: string, type?: string);
}
export declare class TokenExpiredError extends ApiError {
    constructor(message?: string, type?: string);
}
export declare class ForbiddenError extends ApiError {
    constructor(message?: string, type?: string);
}
export declare class ServerError extends ApiError {
    constructor(message?: string, type?: string);
}
