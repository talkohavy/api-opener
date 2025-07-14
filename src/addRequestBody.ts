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
 * @description
 * IMPORTANT NOTE!!!
 * As of 27/01/2024, there is no validation on the body's properties,
 * not in `application/json` and not in `application/x-www-form-urlencoded`.
 * The only check swagger enforces is the `isRequired` for the entire body
 * when it's `application/json`, and the requiredFields when it's
 * `application/x-www-form-urlencoded` which checks the existence of each field.
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
