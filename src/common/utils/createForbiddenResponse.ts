import { HttpStatusCodes, type SwaggerResponse } from '../constants';

/**
 * Creates a forbidden response (403 Forbidden) with optional schema.
 *
 * @param description - Description of the forbidden error
 * @param schema - Optional schema for the error response body
 * @returns A SwaggerResponse object with 403 status
 *
 * @example
 * ```typescript
 * const response = createForbiddenResponse('Access denied');
 * ```
 */
export function createForbiddenResponse(description = 'Forbidden', schema?: any): SwaggerResponse {
  return {
    [HttpStatusCodes.FORBIDDEN]: {
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
