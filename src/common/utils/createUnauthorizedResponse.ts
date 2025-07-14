import { HttpStatusCodes, type SwaggerResponse } from '../constants';

/**
 * Creates an unauthorized response (401 Unauthorized) with optional schema.
 *
 * @param description - Description of the unauthorized error (defaults to "Unauthorized")
 * @param schema - Optional schema for the error response body
 * @returns A SwaggerResponse object with 401 status
 *
 * @example
 * ```typescript
 * const response = createUnauthorizedResponse('Authentication required');
 * ```
 */
export function createUnauthorizedResponse(description = 'Unauthorized', schema?: any): SwaggerResponse {
  return {
    [HttpStatusCodes.UNAUTHORIZED]: {
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
