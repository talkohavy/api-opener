import type { SwaggerResponseContent } from '../types';

export const HttpStatusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER: 500,
  DEFAULT: 'default',
} as const;

type HttpStatusCodesType = typeof HttpStatusCodes;
export type HttpStatusCodeKeys = keyof HttpStatusCodesType;
export type HttpStatusCodeValues = HttpStatusCodesType[HttpStatusCodeKeys];

export type SwaggerResponse = Partial<Record<HttpStatusCodeKeys, SwaggerResponseContent>>;
