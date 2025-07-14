import type { SwaggerSchema } from '../../types';

export interface ValidationSchemaConfig {
  /** Whether the field is required */
  required?: boolean;
  /** Custom validation message */
  message?: string;
  /** Field label for error messages */
  label?: string;
}

export const ValidationSchemas = {
  /**
   * Creates an email validation schema
   */
  email: (config: ValidationSchemaConfig = {}): SwaggerSchema => ({
    type: 'string',
    format: 'email',
    description: config.message || 'Valid email address required',
    example: 'user@example.com',
  }),

  /**
   * Creates a password validation schema
   */
  password: (config: ValidationSchemaConfig & { minLength?: number }): SwaggerSchema => ({
    type: 'string',
    format: 'password',
    minLength: config.minLength || 8,
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]',
    description:
      config.message ||
      'Password must contain at least 8 characters with uppercase, lowercase, number, and special character',
  }),

  /**
   * Creates a phone number validation schema
   */
  phoneNumber: (config: ValidationSchemaConfig = {}): SwaggerSchema => ({
    type: 'string',
    pattern: '^\\+?[1-9]\\d{1,14}$',
    description: config.message || 'Valid phone number in international format',
    example: '+1234567890',
  }),

  /**
   * Creates a URL validation schema
   */
  url: (config: ValidationSchemaConfig = {}): SwaggerSchema => ({
    type: 'string',
    pattern: '^https?://[^\\s/$.?#].[^\\s]*$',
    description: config.message || 'Valid URL starting with http:// or https://',
    example: 'https://example.com',
  }),

  /**
   * Creates a credit card validation schema
   */
  creditCard: (config: ValidationSchemaConfig = {}): SwaggerSchema => ({
    type: 'string',
    pattern: '^\\d{13,19}$',
    description: config.message || 'Valid credit card number (13-19 digits)',
    example: '4111111111111111',
  }),

  /**
   * Creates a ZIP code validation schema
   */
  zipCode: (config: ValidationSchemaConfig = {}): SwaggerSchema => ({
    type: 'string',
    pattern: '^\\d{5}(-\\d{4})?$',
    description: config.message || 'Valid ZIP code (5 digits or 5+4 format)',
    example: '12345',
  }),

  /**
   * Creates a date validation schema
   */
  date: (config: ValidationSchemaConfig = {}): SwaggerSchema => ({
    type: 'string',
    format: 'date',
    description: config.message || 'Date in YYYY-MM-DD format',
    example: '2025-07-14',
  }),

  /**
   * Creates a date-time validation schema
   */
  dateTime: (config: ValidationSchemaConfig = {}): SwaggerSchema => ({
    type: 'string',
    format: 'date-time',
    description: config.message || 'Date and time in ISO 8601 format',
    example: '2025-07-14T12:00:00Z',
  }),

  /**
   * Creates a UUID validation schema
   */
  uuid: (config: ValidationSchemaConfig = {}): SwaggerSchema => ({
    type: 'string',
    format: 'uuid',
    pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
    description: config.message || 'Valid UUID in standard format',
    example: '123e4567-e89b-12d3-a456-426614174000',
  }),

  /**
   * Creates a username validation schema
   */
  username: (config: ValidationSchemaConfig & { minLength?: number; maxLength?: number }): SwaggerSchema => ({
    type: 'string',
    minLength: config.minLength || 3,
    maxLength: config.maxLength || 30,
    pattern: '^[a-zA-Z0-9_.-]+$',
    description: config.message || 'Username with alphanumeric characters, underscores, dots, and hyphens',
    example: 'user_123',
  }),

  /**
   * Creates a slug validation schema
   */
  slug: (config: ValidationSchemaConfig = {}): SwaggerSchema => ({
    type: 'string',
    pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
    description: config.message || 'URL-friendly slug with lowercase letters, numbers, and hyphens',
    example: 'my-blog-post',
  }),

  /**
   * Creates a hex color validation schema
   */
  hexColor: (config: ValidationSchemaConfig = {}): SwaggerSchema => ({
    type: 'string',
    pattern: '^#[0-9A-Fa-f]{6}$',
    description: config.message || 'Hex color code in #RRGGBB format',
    example: '#FF5733',
  }),

  /**
   * Creates an IP address validation schema
   */
  ipAddress: (config: ValidationSchemaConfig = {}): SwaggerSchema => ({
    type: 'string',
    pattern: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
    description: config.message || 'Valid IPv4 address',
    example: '192.168.1.1',
  }),

  /**
   * Creates a MAC address validation schema
   */
  macAddress: (config: ValidationSchemaConfig = {}): SwaggerSchema => ({
    type: 'string',
    pattern: '^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$',
    description: config.message || 'Valid MAC address in xx:xx:xx:xx:xx:xx format',
    example: '00:1B:44:11:3A:B7',
  }),

  /**
   * Creates a social security number validation schema
   */
  ssn: (config: ValidationSchemaConfig = {}): SwaggerSchema => ({
    type: 'string',
    pattern: '^\\d{3}-\\d{2}-\\d{4}$',
    description: config.message || 'Social Security Number in xxx-xx-xxxx format',
    example: '123-45-6789',
  }),

  /**
   * Creates a positive integer validation schema
   */
  positiveInteger: (config: ValidationSchemaConfig = {}): SwaggerSchema => ({
    type: 'integer',
    minimum: 1,
    description: config.message || 'Positive integer (greater than 0)',
    example: 42,
  }),

  /**
   * Creates a non-negative integer validation schema
   */
  nonNegativeInteger: (config: ValidationSchemaConfig = {}): SwaggerSchema => ({
    type: 'integer',
    minimum: 0,
    description: config.message || 'Non-negative integer (0 or greater)',
    example: 0,
  }),

  /**
   * Creates a positive number validation schema
   */
  positiveNumber: (config: ValidationSchemaConfig = {}): SwaggerSchema => ({
    type: 'number',
    minimum: 0,
    exclusiveMinimum: true,
    description: config.message || 'Positive number (greater than 0)',
    example: 42.5,
  }),

  /**
   * Creates a price validation schema
   */
  price: (config: ValidationSchemaConfig = {}): SwaggerSchema => ({
    type: 'number',
    minimum: 0,
    multipleOf: 0.01,
    description: config.message || 'Price with up to 2 decimal places',
    example: 29.99,
  }),

  /**
   * Creates a percentage validation schema
   */
  percentage: (config: ValidationSchemaConfig = {}): SwaggerSchema => ({
    type: 'number',
    minimum: 0,
    maximum: 100,
    description: config.message || 'Percentage value between 0 and 100',
    example: 75.5,
  }),

  /**
   * Creates a rating validation schema
   */
  rating: (config: ValidationSchemaConfig & { min?: number; max?: number }): SwaggerSchema => ({
    type: 'number',
    minimum: config.min !== undefined ? config.min : 1,
    maximum: config.max !== undefined ? config.max : 5,
    description:
      config.message ||
      `Rating between ${config.min !== undefined ? config.min : 1} and ${config.max !== undefined ? config.max : 5}`,
    example: 4.2,
  }),
};

export function createEnumValidationSchema(
  values: (string | number)[],
  config: ValidationSchemaConfig = {},
): SwaggerSchema {
  const isStringEnum = values.every((val) => typeof val === 'string');
  const isNumberEnum = values.every((val) => typeof val === 'number');

  return {
    type: isStringEnum ? 'string' : isNumberEnum ? 'number' : 'string',
    enum: values,
    description: config.message || `Must be one of: ${values.join(', ')}`,
    example: values[0],
  };
}

export function createArrayValidationSchema(
  itemSchema: SwaggerSchema,
  config: ValidationSchemaConfig & { minItems?: number; maxItems?: number; uniqueItems?: boolean },
): SwaggerSchema {
  return {
    type: 'array',
    items: itemSchema,
    ...(config.minItems !== undefined && { minItems: config.minItems }),
    ...(config.maxItems !== undefined && { maxItems: config.maxItems }),
    ...(config.uniqueItems !== undefined && { uniqueItems: config.uniqueItems }),
    description: config.message || 'Array of items',
  };
}

export function createStringLengthValidationSchema(
  minLength: number,
  maxLength: number,
  config: ValidationSchemaConfig = {},
): SwaggerSchema {
  return {
    type: 'string',
    minLength,
    maxLength,
    description: config.message || `String between ${minLength} and ${maxLength} characters`,
    example: 'a'.repeat(minLength),
  };
}

export function createNumberRangeValidationSchema(
  minimum: number,
  maximum: number,
  config: ValidationSchemaConfig = {},
): SwaggerSchema {
  return {
    type: 'number',
    minimum,
    maximum,
    description: config.message || `Number between ${minimum} and ${maximum}`,
    example: (minimum + maximum) / 2,
  };
}
