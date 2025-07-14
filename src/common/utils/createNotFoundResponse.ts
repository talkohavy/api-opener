import { HttpStatusCodes, type SwaggerResponse } from '../constants';

/**
 * Creates a not found response (404 Not Found) with optional schema.
 *
 * @param description - Description of the not found error (defaults to "Not Found")
 * @param schema - Optional schema for the error response body
 * @returns A SwaggerResponse object with 404 status
 *
 * @example
 * ```typescript
 * const response = createNotFoundResponse('User not found');
 * ```
 */
export function createNotFoundResponse(description = 'Not Found', schema?: any): SwaggerResponse {
  return {
    [HttpStatusCodes.NOT_FOUND]: {
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
