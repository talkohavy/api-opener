import type { SwaggerParameter } from './types';

export type AddFilterParamToQueryProps = {
  fieldName: string;
  description?: string;
  schema?: any;
  required?: boolean;
};

/**
 * Creates a standardized filter parameter for OpenAPI query specifications.
 *
 * @description This function generates a query parameter for filtering results in REST APIs.
 * The parameter can be customized with different field names, descriptions, and validation schemas.
 *
 * @param props - Configuration object for the filter parameter
 * @param props.fieldName - The name of the filter parameter (e.g., 'status', 'category')
 * @param props.description - Optional description (defaults to "Filter by {fieldName}")
 * @param props.schema - Optional schema definition for the parameter
 * @param props.required - Whether the parameter is required (defaults to false)
 *
 * @returns A SwaggerParameter object representing the filter query parameter
 *
 * @example
 * ```typescript
 * // Basic string filter
 * const statusFilter = addFilterParamToQuery({
 *   fieldName: 'status',
 *   description: 'Filter users by status',
 *   schema: {
 *     type: 'string',
 *     enum: ['active', 'inactive', 'pending']
 *   }
 * });
 *
 * // Numeric filter
 * const ageFilter = addFilterParamToQuery({
 *   fieldName: 'minAge',
 *   description: 'Filter users with minimum age',
 *   schema: {
 *     type: 'integer',
 *     minimum: 0,
 *     maximum: 120
 *   }
 * });
 *
 * // Use in createApiRoute parameters array
 * const route = createApiRoute({
 *   route: '/users',
 *   method: 'get',
 *   parameters: [
 *     addFilterParamToQuery({
 *       fieldName: 'status',
 *       schema: { type: 'string', enum: ['active', 'inactive'] }
 *     }),
 *     addFilterParamToQuery({
 *       fieldName: 'role',
 *       schema: { type: 'string' }
 *     })
 *   ]
 * });
 * ```
 */
export function addFilterParamToQuery(props: AddFilterParamToQueryProps): SwaggerParameter {
  const { fieldName, description = `Filter by ${fieldName}`, schema = { type: 'string' }, required = false } = props;

  return {
    name: fieldName,
    in: 'query',
    description,
    required,
    schema,
  };
}
