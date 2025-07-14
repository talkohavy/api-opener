import type { SwaggerSchema } from '../../types';

/**
 * Creates a schema reference to a component schema
 *
 * @param schemaName - Name of the schema in components/schemas
 * @returns SwaggerSchema with $ref
 *
 * @example
 * ```typescript
 * const userRef = createSchemaReference('User');
 * // Returns: { $ref: '#/components/schemas/User' }
 * ```
 */
export function createSchemaReference(schemaName: string): SwaggerSchema {
  return {
    $ref: `#/components/schemas/${schemaName}`,
  };
}

/**
 * Creates a schema reference to a parameter
 *
 * @param parameterName - Name of the parameter in components/parameters
 * @returns Schema reference object
 *
 * @example
 * ```typescript
 * const pageParam = createParameterReference('PageParam');
 * // Returns: { $ref: '#/components/parameters/PageParam' }
 * ```
 */
export function createParameterReference(parameterName: string): { $ref: string } {
  return {
    $ref: `#/components/parameters/${parameterName}`,
  };
}

/**
 * Creates a schema reference to a response
 *
 * @param responseName - Name of the response in components/responses
 * @returns Schema reference object
 *
 * @example
 * ```typescript
 * const errorResponse = createResponseReference('ErrorResponse');
 * // Returns: { $ref: '#/components/responses/ErrorResponse' }
 * ```
 */
export function createResponseReference(responseName: string): { $ref: string } {
  return {
    $ref: `#/components/responses/${responseName}`,
  };
}

/**
 * Creates a schema reference to a request body
 *
 * @param requestBodyName - Name of the request body in components/requestBodies
 * @returns Schema reference object
 *
 * @example
 * ```typescript
 * const userRequestBody = createRequestBodyReference('UserRequestBody');
 * // Returns: { $ref: '#/components/requestBodies/UserRequestBody' }
 * ```
 */
export function createRequestBodyReference(requestBodyName: string): { $ref: string } {
  return {
    $ref: `#/components/requestBodies/${requestBodyName}`,
  };
}

/**
 * Creates a schema reference to a security scheme
 *
 * @param schemeName - Name of the security scheme in components/securitySchemes
 * @returns Schema reference object
 *
 * @example
 * ```typescript
 * const bearerAuth = createSecuritySchemeReference('BearerAuth');
 * // Returns: { $ref: '#/components/securitySchemes/BearerAuth' }
 * ```
 */
export function createSecuritySchemeReference(schemeName: string): { $ref: string } {
  return {
    $ref: `#/components/securitySchemes/${schemeName}`,
  };
}

/**
 * Validates if a string is a valid schema reference
 *
 * @param reference - String to validate
 * @returns True if valid reference format
 *
 * @example
 * ```typescript
 * isValidSchemaReference('#/components/schemas/User'); // true
 * isValidSchemaReference('User'); // false
 * ```
 */
export function isValidSchemaReference(reference: string): boolean {
  const referencePattern =
    /^#\/components\/(schemas|parameters|responses|requestBodies|securitySchemes)\/[a-zA-Z0-9_-]+$/;
  return referencePattern.test(reference);
}

/**
 * Extracts the component name from a schema reference
 *
 * @param reference - Schema reference string
 * @returns Component name or null if invalid
 *
 * @example
 * ```typescript
 * getComponentNameFromReference('#/components/schemas/User'); // 'User'
 * getComponentNameFromReference('invalid'); // null
 * ```
 */
export function getComponentNameFromReference(reference: string): string | null {
  const match = reference.match(/^#\/components\/\w+\/(.+)$/);
  return match ? match[1]! : null;
}

/**
 * Gets the component type from a schema reference
 *
 * @param reference - Schema reference string
 * @returns Component type or null if invalid
 *
 * @example
 * ```typescript
 * getComponentTypeFromReference('#/components/schemas/User'); // 'schemas'
 * getComponentTypeFromReference('invalid'); // null
 * ```
 */
export function getComponentTypeFromReference(reference: string): string | null {
  const match = reference.match(/^#\/components\/(\w+)\/.+$/);
  return match ? match[1]! : null;
}

export const CommonSchemaReferences = {
  // Standard entity references
  User: createSchemaReference('User'),
  Product: createSchemaReference('Product'),
  Order: createSchemaReference('Order'),
  Category: createSchemaReference('Category'),
  Address: createSchemaReference('Address'),

  // Error response references
  ErrorResponse: createSchemaReference('ErrorResponse'),
  ValidationErrorResponse: createSchemaReference('ValidationErrorResponse'),

  // Common parameter references
  PageParam: createParameterReference('PageParam'),
  LimitParam: createParameterReference('LimitParam'),
  SortParam: createParameterReference('SortParam'),

  // Common response references
  SuccessResponse: createResponseReference('SuccessResponse'),
  CreatedResponse: createResponseReference('CreatedResponse'),
  NotFoundResponse: createResponseReference('NotFoundResponse'),
  UnauthorizedResponse: createResponseReference('UnauthorizedResponse'),

  // Security scheme references
  BearerAuth: createSecuritySchemeReference('BearerAuth'),
  ApiKeyAuth: createSecuritySchemeReference('ApiKeyAuth'),
  OAuth2: createSecuritySchemeReference('OAuth2'),
};

export const SchemaReferenceUtils = {
  createSchemaReference,
  createParameterReference,
  createResponseReference,
  createRequestBodyReference,
  createSecuritySchemeReference,
  isValidSchemaReference,
  getComponentNameFromReference,
  getComponentTypeFromReference,
  CommonSchemaReferences,
};
