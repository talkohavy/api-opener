import { HttpStatusCodes, type SwaggerResponse } from '../constants';

/**
 * Creates a successful response (200 OK) with optional schema.
 *
 * @param description - Description of the successful response
 * @param schema - Optional schema for the response body
 * @returns A SwaggerResponse object with 200 status
 *
 * @example
 * ```typescript
 * const response = createSuccessResponse('User retrieved successfully', {
 *   $ref: '#/components/schemas/User'
 * });
 * ```
 */
export function createSuccessResponse(description: string, schema?: any): SwaggerResponse {
  return {
    [HttpStatusCodes.OK]: {
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
