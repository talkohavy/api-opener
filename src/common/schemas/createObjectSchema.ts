import type { SwaggerSchema, SwaggerProperty } from '../../types';

export interface ObjectSchemaConfig {
  /** Object properties */
  properties: Record<string, SwaggerProperty>;
  /** Required property names */
  required?: string[];
  /** Additional properties allowed */
  additionalProperties?: boolean | SwaggerSchema;
  /** Minimum number of properties */
  minProperties?: number;
  /** Maximum number of properties */
  maxProperties?: number;
  /** Example value */
  example?: any;
  /** Description of the field */
  description?: string;
}

/**
 * Creates an object schema with properties and validation
 *
 * @param config - Configuration for the object schema
 * @returns SwaggerSchema object for an object field
 *
 * @example
 * ```typescript
 * const userSchema = createObjectSchema({
 *   properties: {
 *     id: { type: 'integer', minimum: 1 },
 *     name: { type: 'string', minLength: 2 },
 *     email: { type: 'string', format: 'email' }
 *   },
 *   required: ['id', 'name'],
 *   description: 'User object',
 *   example: {
 *     id: 1,
 *     name: 'John Doe',
 *     email: 'john@example.com'
 *   }
 * });
 * ```
 */
export function createObjectSchema(config: ObjectSchemaConfig): SwaggerSchema {
  const schema: any = {
    type: 'object',
    properties: config.properties,
    ...(config.required && config.required.length > 0 && { required: config.required }),
    ...(config.additionalProperties !== undefined && { additionalProperties: config.additionalProperties }),
    ...(config.minProperties !== undefined && { minProperties: config.minProperties }),
    ...(config.maxProperties !== undefined && { maxProperties: config.maxProperties }),
    ...(config.example && { example: config.example }),
    ...(config.description && { description: config.description }),
  };

  return schema;
}

export const CommonObjectSchemas = {
  user: createObjectSchema({
    properties: {
      id: { type: 'integer', minimum: 1, description: 'Unique user identifier' },
      email: { type: 'string', format: 'email', description: 'User email address' },
      name: { type: 'string', minLength: 2, maxLength: 100, description: 'User full name' },
      createdAt: { type: 'string', format: 'date-time', description: 'User creation timestamp' },
      isActive: { type: 'boolean', description: 'Whether user is active' },
    },
    required: ['id', 'email', 'name'],
    description: 'User object',
    example: {
      id: 1,
      email: 'user@example.com',
      name: 'John Doe',
      createdAt: '2025-07-14T12:00:00Z',
      isActive: true,
    },
  }),

  address: createObjectSchema({
    properties: {
      street: { type: 'string', minLength: 5, description: 'Street address' },
      city: { type: 'string', minLength: 2, description: 'City name' },
      state: { type: 'string', minLength: 2, description: 'State or province' },
      zipCode: { type: 'string', pattern: '^\\d{5}(-\\d{4})?$', description: 'ZIP or postal code' },
      country: { type: 'string', minLength: 2, description: 'Country name' },
    },
    required: ['street', 'city', 'state', 'zipCode', 'country'],
    description: 'Address object',
    example: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
  }),

  product: createObjectSchema({
    properties: {
      id: { type: 'integer', minimum: 1, description: 'Product ID' },
      name: { type: 'string', minLength: 2, description: 'Product name' },
      price: { type: 'number', minimum: 0, description: 'Product price' },
      category: { type: 'string', description: 'Product category' },
      inStock: { type: 'boolean', description: 'Whether product is in stock' },
      tags: { type: 'array', items: { type: 'string' }, description: 'Product tags' },
    },
    required: ['id', 'name', 'price'],
    description: 'Product object',
    example: {
      id: 1,
      name: 'Laptop',
      price: 999.99,
      category: 'Electronics',
      inStock: true,
      tags: ['computer', 'electronics'],
    },
  }),

  error: createObjectSchema({
    properties: {
      code: { type: 'string', description: 'Error code' },
      message: { type: 'string', description: 'Error message' },
      details: { type: 'array', items: { type: 'string' }, description: 'Error details' },
      timestamp: { type: 'string', format: 'date-time', description: 'Error timestamp' },
    },
    required: ['code', 'message'],
    description: 'Error object',
    example: {
      code: 'VALIDATION_ERROR',
      message: 'Invalid input data',
      details: ['Email is required', 'Name must be at least 2 characters'],
      timestamp: '2025-07-14T12:00:00Z',
    },
  }),

  pagination: createObjectSchema({
    properties: {
      page: { type: 'integer', minimum: 1, description: 'Current page number' },
      limit: { type: 'integer', minimum: 1, description: 'Items per page' },
      total: { type: 'integer', minimum: 0, description: 'Total number of items' },
      totalPages: { type: 'integer', minimum: 0, description: 'Total number of pages' },
      hasNext: { type: 'boolean', description: 'Whether there are more pages' },
      hasPrevious: { type: 'boolean', description: 'Whether there are previous pages' },
    },
    required: ['page', 'limit', 'total'],
    description: 'Pagination metadata',
    example: {
      page: 1,
      limit: 10,
      total: 100,
      totalPages: 10,
      hasNext: true,
      hasPrevious: false,
    },
  }),
};
