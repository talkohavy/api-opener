import { HttpStatusCodes, type SwaggerResponse } from '../constants';

/**
 * Creates a created response (201 Created) with optional schema.
 *
 * @param description - Description of the created response
 * @param schema - Optional schema for the response body
 * @returns A SwaggerResponse object with 201 status
 *
 * @example
 * ```typescript
 * const response = createCreatedResponse('User created successfully', {
 *   $ref: '#/components/schemas/User'
 * });
 * ```
 */
export function createCreatedResponse(description: string, schema?: any): SwaggerResponse {
  return {
    [HttpStatusCodes.CREATED]: {
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
