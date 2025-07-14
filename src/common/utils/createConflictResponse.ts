import { HttpStatusCodes, type SwaggerResponse } from '../constants';

/**
 * Creates a conflict response (409 Conflict) with optional schema.
 *
 * @param description - Description of the conflict error
 * @param schema - Optional schema for the error response body
 * @returns A SwaggerResponse object with 409 status
 *
 * @example
 * ```typescript
 * const response = createConflictResponse('User with this email already exists');
 * ```
 */
export function createConflictResponse(description = 'Conflict', schema?: any): SwaggerResponse {
  return {
    [HttpStatusCodes.CONFLICT]: {
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
