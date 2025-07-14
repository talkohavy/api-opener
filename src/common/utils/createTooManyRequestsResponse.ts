import { HttpStatusCodes, type SwaggerResponse } from '../constants';

/**
 * Creates a too many requests response (429 Too Many Requests) with optional schema.
 *
 * @param description - Description of the rate limit error
 * @param schema - Optional schema for the error response body
 * @returns A SwaggerResponse object with 429 status
 *
 * @example
 * ```typescript
 * const response = createTooManyRequestsResponse('Rate limit exceeded');
 * ```
 */
export function createTooManyRequestsResponse(description = 'Too Many Requests', schema?: any): SwaggerResponse {
  return {
    [HttpStatusCodes.TOO_MANY_REQUESTS]: {
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
