import { HttpStatusCodes, type SwaggerResponse } from '../constants';

/**
 * Creates a bad request response (400 Bad Request) with optional schema.
 *
 * @param description - Description of the bad request error (defaults to "Bad Request")
 * @param schema - Optional schema for the error response body
 * @returns A SwaggerResponse object with 400 status
 *
 * @example
 * ```typescript
 * const response = createBadRequestResponse('Invalid user data provided');
 * ```
 */
export function createBadRequestResponse(description = 'Bad Request', schema?: any): SwaggerResponse {
  return {
    [HttpStatusCodes.BAD_REQUEST]: {
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
