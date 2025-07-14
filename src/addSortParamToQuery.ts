import type { SwaggerParameter } from './types';

export type AddSortParamToQueryProps = {
  description?: string;
  allowedFields?: string[];
  defaultValue?: string;
  allowDescending?: boolean;
};

/**
 * Creates a standardized sort parameter for OpenAPI query specifications.
 *
 * @description This function generates an optional query parameter named 'sort' for sorting
 * results in REST APIs. The parameter accepts string values and can be configured to only
 * allow specific fields and sort directions.
 *
 * @param props - Configuration object for the sort parameter
 * @param props.description - Optional description (defaults to "Field to sort by")
 * @param props.allowedFields - Optional array of allowed field names
 * @param props.defaultValue - Optional default sort field
 * @param props.allowDescending - Whether to allow descending sort with "-" prefix (defaults to true)
 *
 * @returns A SwaggerParameter object representing the sort query parameter
 *
 * @example
 * ```typescript
 * // Basic usage with defaults
 * const sortParam = addSortParamToQuery();
 *
 * // With specific allowed fields
 * const sortParam = addSortParamToQuery({
 *   description: 'Field to sort users by',
 *   allowedFields: ['name', 'email', 'createdAt'],
 *   defaultValue: 'name',
 *   allowDescending: true
 * });
 *
 * // Use in createApiRoute parameters array
 * const route = createApiRoute({
 *   route: '/users',
 *   method: 'get',
 *   parameters: [
 *     addSortParamToQuery({
 *       allowedFields: ['name', 'email', 'createdAt']
 *     })
 *   ]
 * });
 * ```
 */
export function addSortParamToQuery(props: AddSortParamToQueryProps = {}): SwaggerParameter {
  const { description = 'Field to sort by', allowedFields, defaultValue, allowDescending = true } = props;

  const schema: any = { type: 'string' };

  if (allowedFields && allowedFields.length > 0) {
    // Create enum with optional descending versions
    const sortOptions = allowDescending
      ? [...allowedFields, ...allowedFields.map((field) => `-${field}`)]
      : allowedFields;

    schema.enum = sortOptions;
    schema.example = allowedFields[0];
  }

  if (defaultValue) {
    schema.default = defaultValue;
  }

  return {
    name: 'sort',
    in: 'query',
    description: allowDescending ? `${description} (use "-" prefix for descending order)` : description,
    required: false,
    schema,
  };
}
