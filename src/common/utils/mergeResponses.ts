import type { SwaggerResponse } from '../constants';

/**
 * Merges multiple response objects into a single responses object.
 *
 * @param responses - Array of response objects to merge
 * @returns A merged SwaggerResponse object
 *
 * @example
 * ```typescript
 * const responses = mergeResponses([
 *   createSuccessResponse('User found', { $ref: '#/components/schemas/User' }),
 *   createNotFoundResponse('User not found'),
 *   createInternalServerErrorResponse()
 * ]);
 * ```
 */
export function mergeResponses(...responses: SwaggerResponse[]): SwaggerResponse {
  return responses.reduce((acc, response) => {
    return Object.assign(acc, response);
  }, {});
}
