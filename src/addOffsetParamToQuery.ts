import type { SwaggerParameter } from './types';

export type AddOffsetParamToQueryProps = {
  description?: string;
  defaultValue?: number;
  minimum?: number;
};

/**
 * Creates a standardized offset parameter for OpenAPI query specifications.
 *
 * @description This function generates an optional query parameter named 'offset' for pagination
 * in REST APIs. The parameter accepts integer values and is commonly used to specify the
 * number of results to skip before returning results.
 *
 * @param props - Configuration object for the offset parameter
 * @param props.description - Optional description (defaults to "Number of results to skip")
 * @param props.defaultValue - Optional default value for the offset
 * @param props.minimum - Optional minimum value (defaults to 0)
 *
 * @returns A SwaggerParameter object representing the offset query parameter
 *
 * @example
 * ```typescript
 * // Basic usage with defaults
 * const offsetParam = addOffsetParamToQuery({});
 *
 * // With custom configuration
 * const offsetParam = addOffsetParamToQuery({
 *   description: 'Number of users to skip',
 *   defaultValue: 0,
 *   minimum: 0
 * });
 *
 * // Use in createApiRoute parameters array
 * const route = createApiRoute({
 *   route: '/users',
 *   method: 'get',
 *   parameters: [
 *     addLimitParamToQuery({ maximum: 50 }),
 *     addOffsetParamToQuery({})
 *   ]
 * });
 * ```
 */
export function addOffsetParamToQuery(props: AddOffsetParamToQueryProps = {}): SwaggerParameter {
  const { description = 'Number of results to skip', defaultValue = 0, minimum = 0 } = props;

  return {
    name: 'offset',
    in: 'query',
    description,
    required: false,
    schema: {
      type: 'integer',
      minimum,
      default: defaultValue,
    },
  };
}
