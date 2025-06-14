import type { SwaggerResponseContent } from '../types';

export const HttpStatusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
  DEFAULT: 'default',
} as const;

type HttpStatusCodesType = typeof HttpStatusCodes;
export type HttpStatusCodeKeys = keyof HttpStatusCodesType;
export type HttpStatusCodeValues = HttpStatusCodesType[HttpStatusCodeKeys];

export type SwaggerResponse = {
  [HttpStatusCodes.OK]?: SwaggerResponseContent;
  [HttpStatusCodes.CREATED]?: SwaggerResponseContent;
  [HttpStatusCodes.BAD_REQUEST]?: SwaggerResponseContent;
  [HttpStatusCodes.NOT_FOUND]?: SwaggerResponseContent;
  [HttpStatusCodes.UNAUTHORIZED]?: SwaggerResponseContent;
  [HttpStatusCodes.FORBIDDEN]?: SwaggerResponseContent;
  [HttpStatusCodes.INTERNAL_SERVER_ERROR]?: SwaggerResponseContent;
  [HttpStatusCodes.DEFAULT]?: SwaggerResponseContent;
};
