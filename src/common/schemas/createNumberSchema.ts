import type { SwaggerSchema } from '../../types';

export interface NumberSchemaConfig {
  /** Minimum value */
  minimum?: number;
  /** Maximum value */
  maximum?: number;
  /** Whether minimum is exclusive */
  exclusiveMinimum?: boolean;
  /** Whether maximum is exclusive */
  exclusiveMaximum?: boolean;
  /** Multiple of constraint */
  multipleOf?: number;
  /** Number format (float or double) */
  format?: 'float' | 'double';
  /** Default value */
  default?: number;
  /** Example value */
  example?: number;
  /** Description of the field */
  description?: string;
}

/**
 * Creates a number schema with validation constraints
 *
 * @param config - Configuration for the number schema
 * @returns SwaggerSchema object for a number field
 *
 * @example
 * ```typescript
 * const priceSchema = createNumberSchema({
 *   minimum: 0,
 *   multipleOf: 0.01,
 *   description: 'Price in USD',
 *   example: 29.99
 * });
 *
 * const scoreSchema = createNumberSchema({
 *   minimum: 0,
 *   maximum: 100,
 *   description: 'Score percentage'
 * });
 * ```
 */
export function createNumberSchema(config: NumberSchemaConfig = {}): SwaggerSchema {
  const schema: any = {
    type: 'number',
    ...(config.minimum !== undefined && { minimum: config.minimum }),
    ...(config.maximum !== undefined && { maximum: config.maximum }),
    ...(config.exclusiveMinimum && { exclusiveMinimum: config.exclusiveMinimum }),
    ...(config.exclusiveMaximum && { exclusiveMaximum: config.exclusiveMaximum }),
    ...(config.multipleOf && { multipleOf: config.multipleOf }),
    ...(config.format && { format: config.format }),
    ...(config.default !== undefined && { default: config.default }),
    ...(config.example !== undefined && { example: config.example }),
    ...(config.description && { description: config.description }),
  };

  return schema;
}

export interface IntegerSchemaConfig {
  /** Minimum value */
  minimum?: number;
  /** Maximum value */
  maximum?: number;
  /** Whether minimum is exclusive */
  exclusiveMinimum?: boolean;
  /** Whether maximum is exclusive */
  exclusiveMaximum?: boolean;
  /** Multiple of constraint */
  multipleOf?: number;
  /** Integer format (int32 or int64) */
  format?: 'int32' | 'int64';
  /** Default value */
  default?: number;
  /** Example value */
  example?: number;
  /** Description of the field */
  description?: string;
}

/**
 * Creates an integer schema with validation constraints
 *
 * @param config - Configuration for the integer schema
 * @returns SwaggerSchema object for an integer field
 *
 * @example
 * ```typescript
 * const ageSchema = createIntegerSchema({
 *   minimum: 0,
 *   maximum: 150,
 *   description: 'Age in years',
 *   example: 25
 * });
 *
 * const idSchema = createIntegerSchema({
 *   minimum: 1,
 *   description: 'Unique identifier'
 * });
 * ```
 */
export function createIntegerSchema(config: IntegerSchemaConfig = {}): SwaggerSchema {
  const schema: any = {
    type: 'integer',
    ...(config.minimum !== undefined && { minimum: config.minimum }),
    ...(config.maximum !== undefined && { maximum: config.maximum }),
    ...(config.exclusiveMinimum && { exclusiveMinimum: config.exclusiveMinimum }),
    ...(config.exclusiveMaximum && { exclusiveMaximum: config.exclusiveMaximum }),
    ...(config.multipleOf && { multipleOf: config.multipleOf }),
    ...(config.format && { format: config.format }),
    ...(config.default !== undefined && { default: config.default }),
    ...(config.example !== undefined && { example: config.example }),
    ...(config.description && { description: config.description }),
  };

  return schema;
}

export const CommonNumberSchemas = {
  price: createNumberSchema({
    minimum: 0,
    multipleOf: 0.01,
    description: 'Price in currency units',
    example: 29.99,
  }),

  percentage: createNumberSchema({
    minimum: 0,
    maximum: 100,
    description: 'Percentage value',
    example: 75.5,
  }),

  rating: createNumberSchema({
    minimum: 1,
    maximum: 5,
    description: 'Rating from 1 to 5',
    example: 4.2,
  }),

  latitude: createNumberSchema({
    minimum: -90,
    maximum: 90,
    description: 'Latitude coordinate',
    example: 40.7128,
  }),

  longitude: createNumberSchema({
    minimum: -180,
    maximum: 180,
    description: 'Longitude coordinate',
    example: -74.006,
  }),

  weight: createNumberSchema({
    minimum: 0,
    description: 'Weight in kilograms',
    example: 70.5,
  }),

  temperature: createNumberSchema({
    description: 'Temperature in Celsius',
    example: 22.5,
  }),
};

export const CommonIntegerSchemas = {
  id: createIntegerSchema({
    minimum: 1,
    description: 'Unique identifier',
    example: 123,
  }),

  age: createIntegerSchema({
    minimum: 0,
    maximum: 150,
    description: 'Age in years',
    example: 25,
  }),

  year: createIntegerSchema({
    minimum: 1900,
    maximum: 2100,
    description: 'Year',
    example: 2025,
  }),

  page: createIntegerSchema({
    minimum: 1,
    default: 1,
    description: 'Page number for pagination',
    example: 1,
  }),

  limit: createIntegerSchema({
    minimum: 1,
    maximum: 100,
    default: 10,
    description: 'Number of items per page',
    example: 10,
  }),

  count: createIntegerSchema({
    minimum: 0,
    description: 'Count of items',
    example: 42,
  }),

  port: createIntegerSchema({
    minimum: 1,
    maximum: 65535,
    description: 'Network port number',
    example: 8080,
  }),

  httpStatus: createIntegerSchema({
    minimum: 100,
    maximum: 599,
    description: 'HTTP status code',
    example: 200,
  }),
};
