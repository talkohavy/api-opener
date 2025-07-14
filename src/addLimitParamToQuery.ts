import type { SwaggerParameter } from './types';

export type AddLimitParamToQueryProps = {
  description?: string;
  defaultValue?: number;
  minimum?: number;
  maximum?: number;
};

/**
 * Creates a standardized limit parameter for OpenAPI query specifications.
 *
 * @description This function generates an optional query parameter named 'limit' for pagination
 * in REST APIs. The parameter accepts integer values and is commonly used to specify the
 * maximum number of results to return in a single request.
 *
 * @param props - Configuration object for the limit parameter
 * @param props.description - Optional description (defaults to "Maximum number of results to return")
 * @param props.defaultValue - Optional default value for the limit
 * @param props.minimum - Optional minimum value (defaults to 1)
 * @param props.maximum - Optional maximum value (defaults to 100)
 *
 * @returns A SwaggerParameter object representing the limit query parameter
 *
 * @example
 * ```typescript
 * // Basic usage with defaults
 * const limitParam = addLimitParamToQuery({});
 *
 * // With custom configuration
 * const limitParam = addLimitParamToQuery({
 *   description: 'Number of users to return',
 *   defaultValue: 20,
 *   minimum: 1,
 *   maximum: 50
 * });
 *
 * // Use in createApiRoute parameters array
 * const route = createApiRoute({
 *   route: '/users',
 *   method: 'get',
 *   parameters: [addLimitParamToQuery({ maximum: 50 })]
 * });
 * ```
 */
export function addLimitParamToQuery(props: AddLimitParamToQueryProps = {}): SwaggerParameter {
  const { description = 'Maximum number of results to return', defaultValue = 10, minimum = 1, maximum = 100 } = props;

  return {
    name: 'limit',
    in: 'query',
    description,
    required: false,
    schema: {
      type: 'integer',
      minimum,
      maximum,
      default: defaultValue,
    },
  };
}
