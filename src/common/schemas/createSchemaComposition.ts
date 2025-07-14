import type { SwaggerSchema } from '../../types';

/**
 * Creates an allOf schema that requires all provided schemas to be valid
 *
 * @param schemas - Array of schemas that must all be valid
 * @param description - Optional description for the combined schema
 * @returns SwaggerSchema with allOf composition
 *
 * @example
 * ```typescript
 * const userWithAddress = createAllOfSchema([
 *   CommonObjectSchemas.user,
 *   { type: 'object', properties: { address: CommonObjectSchemas.address } }
 * ], 'User with address information');
 * ```
 */
export function createAllOfSchema(schemas: SwaggerSchema[], description?: string): SwaggerSchema {
  const schema: any = {
    allOf: schemas,
    ...(description && { description }),
  };

  return schema;
}

/**
 * Creates a oneOf schema that requires exactly one of the provided schemas to be valid
 *
 * @param schemas - Array of schemas where exactly one must be valid
 * @param description - Optional description for the combined schema
 * @returns SwaggerSchema with oneOf composition
 *
 * @example
 * ```typescript
 * const paymentMethod = createOneOfSchema([
 *   { type: 'object', properties: { creditCard: { type: 'string' } } },
 *   { type: 'object', properties: { paypal: { type: 'string' } } },
 *   { type: 'object', properties: { bankTransfer: { type: 'string' } } }
 * ], 'Payment method options');
 * ```
 */
export function createOneOfSchema(schemas: SwaggerSchema[], description?: string): SwaggerSchema {
  const schema: any = {
    oneOf: schemas,
    ...(description && { description }),
  };

  return schema;
}

/**
 * Creates an anyOf schema that requires at least one of the provided schemas to be valid
 *
 * @param schemas - Array of schemas where at least one must be valid
 * @param description - Optional description for the combined schema
 * @returns SwaggerSchema with anyOf composition
 *
 * @example
 * ```typescript
 * const contactInfo = createAnyOfSchema([
 *   { type: 'object', properties: { email: { type: 'string', format: 'email' } } },
 *   { type: 'object', properties: { phone: { type: 'string' } } }
 * ], 'Contact information (email or phone)');
 * ```
 */
export function createAnyOfSchema(schemas: SwaggerSchema[], description?: string): SwaggerSchema {
  const schema: any = {
    anyOf: schemas,
    ...(description && { description }),
  };

  return schema;
}

/**
 * Creates a not schema that requires the provided schema to be invalid
 *
 * @param schema - Schema that must be invalid
 * @param description - Optional description for the negated schema
 * @returns SwaggerSchema with not composition
 *
 * @example
 * ```typescript
 * const notEmptyString = createNotSchema(
 *   { type: 'string', maxLength: 0 },
 *   'Non-empty string'
 * );
 * ```
 */
export function createNotSchema(schema: SwaggerSchema, description?: string): SwaggerSchema {
  const resultSchema: any = {
    not: schema,
    ...(description && { description }),
  };

  return resultSchema;
}

/**
 * Creates a conditional schema using if/then/else logic
 *
 * @param ifSchema - Condition schema
 * @param thenSchema - Schema to apply if condition is true
 * @param elseSchema - Schema to apply if condition is false
 * @param description - Optional description
 * @returns SwaggerSchema with conditional logic
 *
 * @example
 * ```typescript
 * const conditionalUser = createConditionalSchema(
 *   { properties: { type: { const: 'admin' } } },
 *   { properties: { permissions: { type: 'array' } }, required: ['permissions'] },
 *   { properties: { role: { type: 'string' } } },
 *   'User with conditional admin permissions'
 * );
 * ```
 */
export function createConditionalSchema(
  ifSchema: SwaggerSchema,
  thenSchema: SwaggerSchema,
  elseSchema?: SwaggerSchema,
  description?: string,
): SwaggerSchema {
  const schema: any = {
    if: ifSchema,
    then: thenSchema,
    ...(elseSchema && { else: elseSchema }),
    ...(description && { description }),
  };

  return schema;
}

/**
 * Creates schema with discriminator for polymorphic objects
 *
 * @param discriminator - Property name used for discrimination
 * @param mapping - Mapping of discriminator values to schema references
 * @param description - Optional description
 * @returns SwaggerSchema with discriminator
 *
 * @example
 * ```typescript
 * const animal = createDiscriminatorSchema('type', {
 *   dog: '#/components/schemas/Dog',
 *   cat: '#/components/schemas/Cat'
 * }, 'Animal with type discrimination');
 * ```
 */
export function createDiscriminatorSchema(
  discriminator: string,
  mapping: Record<string, string>,
  description?: string,
): SwaggerSchema {
  const schema: any = {
    discriminator: {
      propertyName: discriminator,
      mapping,
    },
    ...(description && { description }),
  };

  return schema;
}

export const CommonSchemaCompositions = {
  /**
   * Creates a nullable version of a schema
   */
  nullable: (schema: SwaggerSchema, description?: string) =>
    createOneOfSchema([schema, { type: 'null' }], description || 'Nullable value'),

  /**
   * Creates a paginated response schema
   */
  paginated: (itemSchema: SwaggerSchema, description?: string) =>
    createObjectSchema({
      properties: {
        data: { type: 'array', items: itemSchema },
        meta: {
          type: 'object',
          properties: {
            page: { type: 'integer', minimum: 1 },
            limit: { type: 'integer', minimum: 1 },
            total: { type: 'integer', minimum: 0 },
            totalPages: { type: 'integer', minimum: 0 },
          },
          required: ['page', 'limit', 'total'],
        },
      },
      required: ['data', 'meta'],
      description: description || 'Paginated response',
    }),

  /**
   * Creates an API response wrapper schema
   */
  apiResponse: (dataSchema: SwaggerSchema, description?: string) =>
    createObjectSchema({
      properties: {
        success: { type: 'boolean', description: 'Whether request was successful' },
        data: dataSchema,
        message: { type: 'string', description: 'Response message' },
        timestamp: { type: 'string', format: 'date-time', description: 'Response timestamp' },
      },
      required: ['success', 'data'],
      description: description || 'API response wrapper',
    }),

  /**
   * Creates a timestamped entity schema
   */
  timestamped: (baseSchema: SwaggerSchema, description?: string) =>
    createAllOfSchema(
      [
        baseSchema,
        {
          type: 'object',
          properties: {
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
          required: ['createdAt', 'updatedAt'],
        },
      ],
      description || 'Timestamped entity',
    ),
};

function createObjectSchema(config: any) {
  const schema: any = {
    type: 'object',
    properties: config.properties,
    ...(config.required && config.required.length > 0 && { required: config.required }),
    ...(config.description && { description: config.description }),
  };
  return schema;
}
