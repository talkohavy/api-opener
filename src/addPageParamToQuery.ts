import type { SwaggerParameter } from './types';

/**
 * Creates a standardized page parameter for OpenAPI query specifications.
 *
 * @description This function generates an optional query parameter named 'page' for pagination
 * in REST APIs. The parameter accepts integer values with a minimum of 1, following common
 * pagination patterns where page numbers start from 1.
 *
 * @returns A SwaggerParameter object representing the page query parameter
 *
 * @example
 * ```typescript
 * // Add page parameter to an API route
 * const pageParam = addPageParamToQuery();
 *
 * // Use in createApiRoute parameters array
 * const route = createApiRoute({
 *   route: '/users',
 *   method: 'get',
 *   parameters: [addPageParamToQuery()]
 * });
 * ```
 */
export function addPageParamToQuery(): SwaggerParameter {
  return {
    name: 'page',
    in: 'query',
    description: 'Num of page',
    required: false,
    schema: { type: 'integer', minimum: 1 },
  };
}
