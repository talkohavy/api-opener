import type { SwaggerProperty, SwaggerRequestBody, SwaggerSchema } from './types';

export type AddRequestBodyProps = {
  description?: string;
  isRequired?: boolean;
  requiredFields?: Array<string>;
  /**
   * When using `properties`, you shouldn't pass `refString`.
   */
  properties?: Record<string, SwaggerProperty>;
  /**
   * When using `refString`, you shouldn't pass `properties`.
   */
  refString?: string;
};

/**
 * Creates a request body definition for OpenAPI specifications.
 *
 * @description This function generates a request body object that supports both inline schema
 * definitions and schema references. It supports both JSON and form-encoded content types
 * and includes validation for required fields and proper schema references.
 *
 * @param props - Configuration object for the request body
 * @param props.description - Optional description of the request body
 * @param props.isRequired - Whether the request body is required (defaults to false)
 * @param props.requiredFields - Array of field names that are required when using properties
 * @param props.properties - Object defining properties for inline schema (mutually exclusive with refString)
 * @param props.refString - Reference string to external schema (mutually exclusive with properties)
 *
 * @returns A SwaggerRequestBody object with the specified configuration
 *
 * @throws {RequestBodyValidationError} When validation fails for parameters
 *
 * @example
 * ```typescript
 * // Using inline properties
 * const userBody = addRequestBody({
 *   description: 'User data for creation',
 *   isRequired: true,
 *   requiredFields: ['name', 'email'],
 *   properties: {
 *     name: { type: 'string' },
 *     email: { type: 'string', format: 'email' },
 *     age: { type: 'integer', minimum: 0 }
 *   }
 * });
 *
 * // Using schema reference
 * const userBody = addRequestBody({
 *   description: 'User data for creation',
 *   isRequired: true,
 *   refString: '#/components/schemas/User'
 * });
 * ```
 *
 * @note As of the current implementation, OpenAPI/Swagger does not validate
 * individual properties in the request body - only the overall structure
 * and required field existence is checked.
 */
export function addRequestBody(props: AddRequestBodyProps): SwaggerRequestBody {
  const { description, isRequired, requiredFields, properties, refString } = props;

  validateRequestBody(props);

  const schema: SwaggerSchema = properties
    ? { type: 'object', required: requiredFields, properties }
    : { $ref: refString! };

  return {
    description,
    content: {
      'application/x-www-form-urlencoded': { schema },
      'application/json': { schema },
    },
    required: isRequired,
  };
}

function validateRequestBody(props: AddRequestBodyProps): void {
  const { properties, refString, requiredFields } = props;

  // Must have either properties or refString, but not both
  if (!properties && !refString) {
    throw new RequestBodyValidationError('Either properties or refString must be provided', 'properties');
  }

  if (properties && refString) {
    throw new RequestBodyValidationError('Cannot use both properties and refString. Choose one', 'properties');
  }

  // Validate refString format
  if (refString) {
    if (!refString.startsWith('#/')) {
      throw new RequestBodyValidationError('refString must start with "#/" for local references', 'refString');
    }

    // Basic validation for OpenAPI reference format
    const refPattern = /^#\/(components\/schemas\/[a-zA-Z0-9_-]+|definitions\/[a-zA-Z0-9_-]+)$/;
    if (!refPattern.test(refString)) {
      throw new RequestBodyValidationError(
        'refString must follow OpenAPI reference format: #/components/schemas/SchemaName or #/definitions/SchemaName',
        'refString',
      );
    }
  }

  if (properties) {
    if (typeof properties !== 'object' || Array.isArray(properties)) {
      throw new RequestBodyValidationError('Properties must be an object', 'properties');
    }

    if (Object.keys(properties).length === 0) {
      throw new RequestBodyValidationError('Properties object cannot be empty', 'properties');
    }

    // Validate each property
    Object.entries(properties).forEach(([key, value]) => {
      if (!key || key.trim() === '') {
        throw new RequestBodyValidationError('Property name cannot be empty', 'properties');
      }

      if (!value || typeof value !== 'object') {
        throw new RequestBodyValidationError(`Property "${key}" must be an object`, 'properties');
      }
    });
  }

  // Validate required fields
  if (requiredFields && properties) {
    if (!Array.isArray(requiredFields)) {
      throw new RequestBodyValidationError('requiredFields must be an array', 'requiredFields');
    }

    const propertyNames = Object.keys(properties);
    const invalidFields = requiredFields.filter((field) => !propertyNames.includes(field));
    if (invalidFields.length > 0) {
      throw new RequestBodyValidationError(
        `Required fields [${invalidFields.join(', ')}] not found in properties`,
        'requiredFields',
      );
    }
  }
}

class RequestBodyValidationError extends Error {
  constructor(
    message: string,
    public field: string,
  ) {
    super(message);
    this.name = 'RequestBodyValidationError';
  }
}
