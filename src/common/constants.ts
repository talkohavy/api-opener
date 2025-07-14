import type { SwaggerResponseContent } from '../types';

export const HttpStatusCodes = {
  // 2xx Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // 4xx Client Error
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,

  // 5xx Server Error
  INTERNAL_SERVER: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,

  // Default
  DEFAULT: 'default',
} as const;

type HttpStatusCodesType = typeof HttpStatusCodes;
export type HttpStatusCodeKeys = keyof HttpStatusCodesType;
export type HttpStatusCodeValues = HttpStatusCodesType[HttpStatusCodeKeys];

export type SwaggerResponse = Partial<Record<HttpStatusCodeValues, SwaggerResponseContent>>;
