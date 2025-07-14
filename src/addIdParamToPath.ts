import type { SwaggerParameter, SwaggerSchema } from './types';

export type AddIdParamToPathProps = {
  description?: string;
  schema?: SwaggerSchema;
};

/**
 * Creates a standardized ID parameter for OpenAPI path specifications.
 *
 * @description This function generates a required path parameter named 'id' with customizable
 * description and schema. It's commonly used for REST API endpoints that require an ID parameter
 * in the URL path (e.g., /users/{id}).
 *
 * @param props - Configuration object for the ID parameter
 * @param props.description - Optional description for the parameter (defaults to "ID of the resource")
 * @param props.schema - Optional OpenAPI schema definition for the parameter (defaults to string type)
 *
 * @returns A SwaggerParameter object representing the ID path parameter
 *
 * @example
 * ```typescript
 * // Basic usage with defaults
 * const idParam = addIdParamToPath({});
 *
 * // With custom description
 * const userIdParam = addIdParamToPath({
 *   description: 'Unique identifier for the user'
 * });
 *
 * // With custom schema
 * const numericIdParam = addIdParamToPath({
 *   description: 'User ID',
 *   schema: { type: 'integer', minimum: 1 }
 * });
 * ```
 */
export function addIdParamToPath(props: AddIdParamToPathProps): SwaggerParameter {
  const { description, schema } = props;

  return {
    name: 'id',
    in: 'path',
    description: description || 'ID of the resource',
    required: true,
    schema: schema ?? { type: 'string' },
  };
}
