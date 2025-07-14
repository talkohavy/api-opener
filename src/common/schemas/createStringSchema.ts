import type { SwaggerSchema } from '../../types';

export interface StringSchemaConfig {
  /** Minimum length of the string */
  minLength?: number;
  /** Maximum length of the string */
  maxLength?: number;
  /** Pattern/regex for validation */
  pattern?: string;
  /** String format (date, date-time, email, etc.) */
  format?: 'date' | 'date-time' | 'email' | 'password' | 'byte' | 'binary' | 'uuid';
  /** Enumeration of allowed values */
  enum?: string[];
  /** Default value */
  default?: string;
  /** Example value */
  example?: string;
  /** Description of the field */
  description?: string;
}

/**
 * Creates a string schema with validation constraints
 *
 * @param config - Configuration for the string schema
 * @returns SwaggerSchema object for a string field
 *
 * @example
 * ```typescript
 * const emailSchema = createStringSchema({
 *   format: 'email',
 *   description: 'User email address',
 *   example: 'user@example.com'
 * });
 *
 * const nameSchema = createStringSchema({
 *   minLength: 2,
 *   maxLength: 50,
 *   pattern: '^[a-zA-Z\\s]+$',
 *   description: 'User full name'
 * });
 * ```
 */
export function createStringSchema(config: StringSchemaConfig = {}): SwaggerSchema {
  const schema: any = {
    type: 'string',
    ...(config.minLength && { minLength: config.minLength }),
    ...(config.maxLength && { maxLength: config.maxLength }),
    ...(config.pattern && { pattern: config.pattern }),
    ...(config.format && { format: config.format }),
    ...(config.enum && { enum: config.enum }),
    ...(config.default && { default: config.default }),
    ...(config.example && { example: config.example }),
    ...(config.description && { description: config.description }),
  };

  return schema;
}

export const CommonStringSchemas = {
  email: createStringSchema({
    format: 'email',
    description: 'Email address',
    example: 'user@example.com',
  }),

  password: createStringSchema({
    format: 'password',
    minLength: 8,
    maxLength: 128,
    description: 'Password with minimum 8 characters',
  }),

  uuid: createStringSchema({
    format: 'uuid',
    description: 'UUID identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  }),

  url: createStringSchema({
    pattern: '^https?://.*',
    description: 'URL string',
    example: 'https://example.com',
  }),

  slug: createStringSchema({
    pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
    description: 'URL-friendly slug',
    example: 'my-blog-post',
  }),

  phoneNumber: createStringSchema({
    pattern: '^\\+?[1-9]\\d{1,14}$',
    description: 'Phone number',
    example: '+1234567890',
  }),

  date: createStringSchema({
    format: 'date',
    description: 'Date in YYYY-MM-DD format',
    example: '2025-07-14',
  }),

  dateTime: createStringSchema({
    format: 'date-time',
    description: 'Date and time in ISO 8601 format',
    example: '2025-07-14T12:00:00Z',
  }),

  username: createStringSchema({
    minLength: 3,
    maxLength: 30,
    pattern: '^[a-zA-Z0-9_]+$',
    description: 'Username with alphanumeric characters and underscores',
    example: 'user_123',
  }),

  color: createStringSchema({
    pattern: '^#[0-9A-Fa-f]{6}$',
    description: 'Hex color code',
    example: '#FF5733',
  }),
};
