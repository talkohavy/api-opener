import { HttpStatusCodes, type SwaggerResponse } from '../constants';

/**
 * Creates an internal server error response (500 Internal Server Error) with optional schema.
 *
 * @param description - Description of the server error (defaults to "Internal Server Error")
 * @param schema - Optional schema for the error response body
 * @returns A SwaggerResponse object with 500 status
 *
 * @example
 * ```typescript
 * const response = createInternalServerErrorResponse('Database connection failed');
 * ```
 */
export function createInternalServerErrorResponse(
  description = 'Internal Server Error',
  schema?: any,
): SwaggerResponse {
  return {
    [HttpStatusCodes.INTERNAL_SERVER]: {
      description,
      ...(schema && {
        content: {
          'application/json': { schema },
          'application/x-www-form-urlencoded': { schema },
        },
      }),
    },
  };
}
