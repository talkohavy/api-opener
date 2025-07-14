import type { SwaggerSchema } from '../../types';

export interface ArraySchemaConfig {
  /** Schema for array items */
  items: SwaggerSchema;
  /** Minimum number of items */
  minItems?: number;
  /** Maximum number of items */
  maxItems?: number;
  /** Whether items should be unique */
  uniqueItems?: boolean;
  /** Default value */
  default?: any[];
  /** Example value */
  example?: any[];
  /** Description of the field */
  description?: string;
}

/**
 * Creates an array schema with validation constraints
 *
 * @param config - Configuration for the array schema
 * @returns SwaggerSchema object for an array field
 *
 * @example
 * ```typescript
 * const tagsSchema = createArraySchema({
 *   items: { type: 'string' },
 *   minItems: 1,
 *   maxItems: 10,
 *   uniqueItems: true,
 *   description: 'Array of tags',
 *   example: ['tag1', 'tag2']
 * });
 *
 * const numbersSchema = createArraySchema({
 *   items: { type: 'integer', minimum: 0 },
 *   description: 'Array of positive numbers'
 * });
 * ```
 */
export function createArraySchema(config: ArraySchemaConfig): SwaggerSchema {
  const schema: any = {
    type: 'array',
    items: config.items,
    ...(config.minItems !== undefined && { minItems: config.minItems }),
    ...(config.maxItems !== undefined && { maxItems: config.maxItems }),
    ...(config.uniqueItems !== undefined && { uniqueItems: config.uniqueItems }),
    ...(config.default && { default: config.default }),
    ...(config.example && { example: config.example }),
    ...(config.description && { description: config.description }),
  };

  return schema;
}

export const CommonArraySchemas = {
  strings: createArraySchema({
    items: { type: 'string' },
    description: 'Array of strings',
    example: ['item1', 'item2'],
  }),

  numbers: createArraySchema({
    items: { type: 'number' },
    description: 'Array of numbers',
    example: [1, 2, 3.5],
  }),

  integers: createArraySchema({
    items: { type: 'integer' },
    description: 'Array of integers',
    example: [1, 2, 3],
  }),

  tags: createArraySchema({
    items: { type: 'string', minLength: 1 },
    uniqueItems: true,
    minItems: 1,
    maxItems: 20,
    description: 'Array of unique tags',
    example: ['frontend', 'javascript', 'react'],
  }),

  ids: createArraySchema({
    items: { type: 'integer', minimum: 1 },
    uniqueItems: true,
    minItems: 1,
    description: 'Array of unique IDs',
    example: [1, 2, 3],
  }),

  emails: createArraySchema({
    items: { type: 'string', format: 'email' },
    uniqueItems: true,
    description: 'Array of email addresses',
    example: ['user1@example.com', 'user2@example.com'],
  }),

  urls: createArraySchema({
    items: { type: 'string', pattern: '^https?://.*' },
    description: 'Array of URLs',
    example: ['https://example.com', 'https://another.com'],
  }),

  coordinates: createArraySchema({
    items: { type: 'number' },
    minItems: 2,
    maxItems: 2,
    description: 'Latitude and longitude coordinates',
    example: [40.7128, -74.006],
  }),
};
