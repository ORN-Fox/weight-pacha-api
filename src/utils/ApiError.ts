import { StatusCodes } from "http-status-codes";

interface ErrorDefinition {
  code: string;
  message: string;
}

const DEFAULT_ERRORS: Record<string, ErrorDefinition> = {
  BAD_TOKEN: {
    code: "BAD_TOKEN",
    message: "Token is not valid",
  },
  TOKEN_EXPIRED: {
    code: "TOKEN_EXPIRED",
    message: "Token expired",
  },
  UNAUTHORIZED: {
    code: "UNAUTHORIZED",
    message: "Invalid credentials",
  },
  SERVER_ERROR: {
    code: "SERVER_ERROR",
    message: "Internal server error",
  },
  NOT_FOUND: {
    code: "NOT_FOUND",
    message: "Not found",
  },
  BAD_REQUEST: {
    code: "BAD_REQUEST",
    message: "Bad request",
  },
  FORBIDDEN: {
    code: "FORBIDDEN",
    message: "Permission denied",
  },
  VALIDATION: {
    code: "VALIDATION",
    message: "Validation error",
  },
};

/**
 * Base error class
 */
class BaseError extends Error {
  type: string;
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number, type: string, isOperational: boolean) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }
}

/**
 * API error class
 */
class ApiError extends BaseError {
  constructor(message: string, statusCode: number, type: string) {
    super(message, statusCode, type, true);
  }
}

/**
 * Check if error is an API specific error
 */
export const IsApiError = (err: unknown): boolean => (err instanceof ApiError ? err.isOperational : false);

export { ApiError };

export class NotFoundError extends ApiError {
  constructor(message: string = DEFAULT_ERRORS.NOT_FOUND.message, type: string = DEFAULT_ERRORS.NOT_FOUND.code) {
    super(message, StatusCodes.NOT_FOUND, type);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string = DEFAULT_ERRORS.BAD_REQUEST.message, type: string = DEFAULT_ERRORS.BAD_REQUEST.code) {
    super(message, StatusCodes.BAD_REQUEST, type);
  }
}

export class ValidationError extends ApiError {
  constructor(message: string = DEFAULT_ERRORS.VALIDATION.message, type: string = DEFAULT_ERRORS.VALIDATION.code) {
    super(message, StatusCodes.BAD_REQUEST, type);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = DEFAULT_ERRORS.UNAUTHORIZED.message, type: string = DEFAULT_ERRORS.UNAUTHORIZED.code) {
    super(message, StatusCodes.UNAUTHORIZED, type);
  }
}

export class BadTokenError extends ApiError {
  constructor(message: string = DEFAULT_ERRORS.BAD_TOKEN.message, type: string = DEFAULT_ERRORS.BAD_TOKEN.code) {
    super(message, StatusCodes.UNAUTHORIZED, type);
  }
}

export class TokenExpiredError extends ApiError {
  constructor(message: string = DEFAULT_ERRORS.TOKEN_EXPIRED.message, type: string = DEFAULT_ERRORS.TOKEN_EXPIRED.code) {
    super(message, StatusCodes.UNAUTHORIZED, type);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = DEFAULT_ERRORS.FORBIDDEN.message, type: string = DEFAULT_ERRORS.FORBIDDEN.code) {
    super(message, StatusCodes.FORBIDDEN, type);
  }
}

export class ServerError extends ApiError {
  constructor(message: string = DEFAULT_ERRORS.SERVER_ERROR.message, type: string = DEFAULT_ERRORS.SERVER_ERROR.code) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR, type);
  }
}
