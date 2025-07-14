import { HttpStatusCodes, type SwaggerResponse } from '../constants';

/**
 * Creates an unprocessable entity response (422 Unprocessable Entity) with optional schema.
 *
 * @param description - Description of the validation error
 * @param schema - Optional schema for the error response body
 * @returns A SwaggerResponse object with 422 status
 *
 * @example
 * ```typescript
 * const response = createUnprocessableEntityResponse('Validation failed');
 * ```
 */
export function createUnprocessableEntityResponse(description = 'Unprocessable Entity', schema?: any): SwaggerResponse {
  return {
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: {
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
