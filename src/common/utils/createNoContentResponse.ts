import { HttpStatusCodes, type SwaggerResponse } from '../constants';

/**
 * Creates a no content response (204 No Content).
 *
 * @param description - Description of the no content response
 * @returns A SwaggerResponse object with 204 status
 *
 * @example
 * ```typescript
 * const response = createNoContentResponse('User deleted successfully');
 * ```
 */
export function createNoContentResponse(description = 'No Content'): SwaggerResponse {
  return {
    [HttpStatusCodes.NO_CONTENT]: {
      description,
    },
  };
}
