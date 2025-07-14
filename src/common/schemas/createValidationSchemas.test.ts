import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  ValidationSchemas,
  createEnumValidationSchema,
  createArrayValidationSchema,
  createStringLengthValidationSchema,
  createNumberRangeValidationSchema,
} from './createValidationSchemas';

describe('ValidationSchemas', () => {
  describe('email', () => {
    it('should create a valid email schema', () => {
      const expectedResult = {
        type: 'string',
        format: 'email',
        description: 'Valid email address required',
        example: 'user@example.com',
      };
      const actualResult = ValidationSchemas.email();

      assert.deepStrictEqual(actualResult, expectedResult);
    });

    it('should create a valid email schema with custom message', () => {
      const config = { message: 'Please provide a valid email' };
      const expectedResult = {
        type: 'string',
        format: 'email',
        description: 'Please provide a valid email',
        example: 'user@example.com',
      };
      const actualResult = ValidationSchemas.email(config);

      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe('password', () => {
    it('should create a valid password schema', () => {
      const expectedResult = {
        type: 'string',
        format: 'password',
        minLength: 8,
        pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]',
        description:
          'Password must contain at least 8 characters with uppercase, lowercase, number, and special character',
      };
      const actualResult = ValidationSchemas.password({});

      assert.deepStrictEqual(actualResult, expectedResult);
    });

    it('should create a valid password schema with custom minLength', () => {
      const config = { minLength: 12 };
      const expectedResult = {
        type: 'string',
        format: 'password',
        minLength: 12,
        pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]',
        description:
          'Password must contain at least 8 characters with uppercase, lowercase, number, and special character',
      };
      const actualResult = ValidationSchemas.password(config);

      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe('phoneNumber', () => {
    it('should create a valid phone number schema', () => {
      const expectedResult = {
        type: 'string',
        pattern: '^\\+?[1-9]\\d{1,14}$',
        description: 'Valid phone number in international format',
        example: '+1234567890',
      };
      const actualResult = ValidationSchemas.phoneNumber();

      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe('url', () => {
    it('should create a valid URL schema', () => {
      const expectedResult = {
        type: 'string',
        pattern: '^https?://[^\\s/$.?#].[^\\s]*$',
        description: 'Valid URL starting with http:// or https://',
        example: 'https://example.com',
      };
      const actualResult = ValidationSchemas.url();

      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe('creditCard', () => {
    it('should create a valid credit card schema', () => {
      const expectedResult = {
        type: 'string',
        pattern: '^\\d{13,19}$',
        description: 'Valid credit card number (13-19 digits)',
        example: '4111111111111111',
      };
      const actualResult = ValidationSchemas.creditCard();

      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe('zipCode', () => {
    it('should create a valid ZIP code schema', () => {
      const expectedResult = {
        type: 'string',
        pattern: '^\\d{5}(-\\d{4})?$',
        description: 'Valid ZIP code (5 digits or 5+4 format)',
        example: '12345',
      };
      const actualResult = ValidationSchemas.zipCode();

      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe('date', () => {
    it('should create a valid date schema', () => {
      const expectedResult = {
        type: 'string',
        format: 'date',
        description: 'Date in YYYY-MM-DD format',
        example: '2025-07-14',
      };
      const actualResult = ValidationSchemas.date();

      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe('dateTime', () => {
    it('should create a valid date-time schema', () => {
      const expectedResult = {
        type: 'string',
        format: 'date-time',
        description: 'Date and time in ISO 8601 format',
        example: '2025-07-14T12:00:00Z',
      };
      const actualResult = ValidationSchemas.dateTime();

      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe('uuid', () => {
    it('should create a valid UUID schema', () => {
      const expectedResult = {
        type: 'string',
        format: 'uuid',
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
        description: 'Valid UUID in standard format',
        example: '123e4567-e89b-12d3-a456-426614174000',
      };
      const actualResult = ValidationSchemas.uuid();

      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe('username', () => {
    it('should create a valid username schema', () => {
      const expectedResult = {
        type: 'string',
        minLength: 3,
        maxLength: 30,
        pattern: '^[a-zA-Z0-9_.-]+$',
        description: 'Username with alphanumeric characters, underscores, dots, and hyphens',
        example: 'user_123',
      };
      const actualResult = ValidationSchemas.username({});

      assert.deepStrictEqual(actualResult, expectedResult);
    });

    it('should create a valid username schema with custom lengths', () => {
      const config = { minLength: 5, maxLength: 20 };
      const expectedResult = {
        type: 'string',
        minLength: 5,
        maxLength: 20,
        pattern: '^[a-zA-Z0-9_.-]+$',
        description: 'Username with alphanumeric characters, underscores, dots, and hyphens',
        example: 'user_123',
      };
      const actualResult = ValidationSchemas.username(config);

      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe('slug', () => {
    it('should create a valid slug schema', () => {
      const expectedResult = {
        type: 'string',
        pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
        description: 'URL-friendly slug with lowercase letters, numbers, and hyphens',
        example: 'my-blog-post',
      };
      const actualResult = ValidationSchemas.slug();

      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe('hexColor', () => {
    it('should create a valid hex color schema', () => {
      const expectedResult = {
        type: 'string',
        pattern: '^#[0-9A-Fa-f]{6}$',
        description: 'Hex color code in #RRGGBB format',
        example: '#FF5733',
      };
      const actualResult = ValidationSchemas.hexColor();

      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe('ipAddress', () => {
    it('should create a valid IP address schema', () => {
      const expectedResult = {
        type: 'string',
        pattern: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
        description: 'Valid IPv4 address',
        example: '192.168.1.1',
      };
      const actualResult = ValidationSchemas.ipAddress();

      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe('macAddress', () => {
    it('should create a valid MAC address schema', () => {
      const expectedResult = {
        type: 'string',
        pattern: '^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$',
        description: 'Valid MAC address in xx:xx:xx:xx:xx:xx format',
        example: '00:1B:44:11:3A:B7',
      };
      const actualResult = ValidationSchemas.macAddress();

      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe('ssn', () => {
    it('should create a valid SSN schema', () => {
      const expectedResult = {
        type: 'string',
        pattern: '^\\d{3}-\\d{2}-\\d{4}$',
        description: 'Social Security Number in xxx-xx-xxxx format',
        example: '123-45-6789',
      };
      const actualResult = ValidationSchemas.ssn();

      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe('positiveInteger', () => {
    it('should create a valid positive integer schema', () => {
      const expectedResult = {
        type: 'integer',
        minimum: 1,
        description: 'Positive integer (greater than 0)',
        example: 42,
      };
      const actualResult = ValidationSchemas.positiveInteger();

      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe('nonNegativeInteger', () => {
    it('should create a valid non-negative integer schema', () => {
      const expectedResult = {
        type: 'integer',
        minimum: 0,
        description: 'Non-negative integer (0 or greater)',
        example: 0,
      };
      const actualResult = ValidationSchemas.nonNegativeInteger();

      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe('positiveNumber', () => {
    it('should create a valid positive number schema', () => {
      const expectedResult = {
        type: 'number',
        minimum: 0,
        exclusiveMinimum: true,
        description: 'Positive number (greater than 0)',
        example: 42.5,
      };
      const actualResult = ValidationSchemas.positiveNumber();

      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe('price', () => {
    it('should create a valid price schema', () => {
      const expectedResult = {
        type: 'number',
        minimum: 0,
        multipleOf: 0.01,
        description: 'Price with up to 2 decimal places',
        example: 29.99,
      };
      const actualResult = ValidationSchemas.price();

      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe('percentage', () => {
    it('should create a valid percentage schema', () => {
      const expectedResult = {
        type: 'number',
        minimum: 0,
        maximum: 100,
        description: 'Percentage value between 0 and 100',
        example: 75.5,
      };
      const actualResult = ValidationSchemas.percentage();

      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe('rating', () => {
    it('should create a valid rating schema with defaults', () => {
      const expectedResult = {
        type: 'number',
        minimum: 1,
        maximum: 5,
        description: 'Rating between 1 and 5',
        example: 4.2,
      };
      const actualResult = ValidationSchemas.rating({});

      assert.deepStrictEqual(actualResult, expectedResult);
    });

    it('should create a valid rating schema with custom range', () => {
      const config = { min: 0, max: 10 };
      const expectedResult = {
        type: 'number',
        minimum: 0,
        maximum: 10,
        description: 'Rating between 0 and 10',
        example: 4.2,
      };
      const actualResult = ValidationSchemas.rating(config);

      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });
});

describe('createEnumValidationSchema', () => {
  it('should create a valid string enum schema', () => {
    const values = ['pending', 'approved', 'rejected'];
    const expectedResult = {
      type: 'string',
      enum: values,
      description: 'Must be one of: pending, approved, rejected',
      example: 'pending',
    };
    const actualResult = createEnumValidationSchema(values);

    assert.deepStrictEqual(actualResult, expectedResult);
  });

  it('should create a valid number enum schema', () => {
    const values = [1, 2, 3, 4, 5];
    const expectedResult = {
      type: 'number',
      enum: values,
      description: 'Must be one of: 1, 2, 3, 4, 5',
      example: 1,
    };
    const actualResult = createEnumValidationSchema(values);

    assert.deepStrictEqual(actualResult, expectedResult);
  });

  it('should create a valid enum schema with custom message', () => {
    const values = ['small', 'medium', 'large'];
    const config = { message: 'Please select a valid size' };
    const expectedResult = {
      type: 'string',
      enum: values,
      description: 'Please select a valid size',
      example: 'small',
    };
    const actualResult = createEnumValidationSchema(values, config);

    assert.deepStrictEqual(actualResult, expectedResult);
  });
});

describe('createArrayValidationSchema', () => {
  it('should create a valid array schema', () => {
    const itemSchema = { type: 'string' } as any;
    const expectedResult = {
      type: 'array',
      items: itemSchema,
      description: 'Array of items',
    };
    const actualResult = createArrayValidationSchema(itemSchema, {});

    assert.deepStrictEqual(actualResult, expectedResult);
  });

  it('should create a valid array schema with constraints', () => {
    const itemSchema = { type: 'string' } as any;
    const config = { minItems: 1, maxItems: 5, uniqueItems: true };
    const expectedResult = {
      type: 'array',
      items: itemSchema,
      minItems: 1,
      maxItems: 5,
      uniqueItems: true,
      description: 'Array of items',
    };
    const actualResult = createArrayValidationSchema(itemSchema, config);

    assert.deepStrictEqual(actualResult, expectedResult);
  });

  it('should create a valid array schema with custom message', () => {
    const itemSchema = { type: 'string' } as any;
    const config = { message: 'List of strings' };
    const expectedResult = {
      type: 'array',
      items: itemSchema,
      description: 'List of strings',
    };
    const actualResult = createArrayValidationSchema(itemSchema, config);

    assert.deepStrictEqual(actualResult, expectedResult);
  });
});

describe('createStringLengthValidationSchema', () => {
  it('should create a valid string length schema', () => {
    const minLength = 5;
    const maxLength = 20;
    const expectedResult = {
      type: 'string',
      minLength: 5,
      maxLength: 20,
      description: 'String between 5 and 20 characters',
      example: 'aaaaa',
    };
    const actualResult = createStringLengthValidationSchema(minLength, maxLength);

    assert.deepStrictEqual(actualResult, expectedResult);
  });

  it('should create a valid string length schema with custom message', () => {
    const minLength = 3;
    const maxLength = 10;
    const config = { message: 'Name must be between 3 and 10 characters' };
    const expectedResult = {
      type: 'string',
      minLength: 3,
      maxLength: 10,
      description: 'Name must be between 3 and 10 characters',
      example: 'aaa',
    };
    const actualResult = createStringLengthValidationSchema(minLength, maxLength, config);

    assert.deepStrictEqual(actualResult, expectedResult);
  });
});

describe('createNumberRangeValidationSchema', () => {
  it('should create a valid number range schema', () => {
    const minimum = 10;
    const maximum = 100;
    const expectedResult = {
      type: 'number',
      minimum: 10,
      maximum: 100,
      description: 'Number between 10 and 100',
      example: 55,
    };
    const actualResult = createNumberRangeValidationSchema(minimum, maximum);

    assert.deepStrictEqual(actualResult, expectedResult);
  });

  it('should create a valid number range schema with custom message', () => {
    const minimum = 0;
    const maximum = 1;
    const config = { message: 'Probability value between 0 and 1' };
    const expectedResult = {
      type: 'number',
      minimum: 0,
      maximum: 1,
      description: 'Probability value between 0 and 1',
      example: 0.5,
    };
    const actualResult = createNumberRangeValidationSchema(minimum, maximum, config);

    assert.deepStrictEqual(actualResult, expectedResult);
  });
});
