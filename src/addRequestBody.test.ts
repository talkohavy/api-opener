import assert from 'node:assert';
import { describe, it } from 'node:test';
import { addRequestBody } from './addRequestBody';

describe('addRequestBody', () => {
  it('should create request body with properties', () => {
    const properties = {
      name: {
        type: 'string' as const,
        description: 'User name',
        example: 'John Doe',
      },
      age: {
        type: 'integer' as const,
        minimum: 0,
        maximum: 120,
        description: 'User age',
      },
    };

    const expectedResult = {
      description: 'User data',
      content: {
        'application/x-www-form-urlencoded': {
          schema: {
            type: 'object',
            required: ['name'],
            properties,
          },
        },
        'application/json': {
          schema: {
            type: 'object',
            required: ['name'],
            properties,
          },
        },
      },
      required: true,
    };

    const actualResult = addRequestBody({
      description: 'User data',
      isRequired: true,
      requiredFields: ['name'],
      properties,
    });

    assert.deepEqual(actualResult, expectedResult);
  });

  it('should create request body with reference string', () => {
    const expectedResult = {
      description: 'User data',
      content: {
        'application/x-www-form-urlencoded': {
          schema: {
            $ref: '#/components/schemas/User',
          },
        },
        'application/json': {
          schema: {
            $ref: '#/components/schemas/User',
          },
        },
      },
      required: false,
    };

    const actualResult = addRequestBody({
      description: 'User data',
      isRequired: false,
      refString: '#/components/schemas/User',
    });

    assert.deepEqual(actualResult, expectedResult);
  });

  it('should create request body with default values', () => {
    const properties = {
      name: { type: 'string' as const },
    };

    const expectedResult = {
      description: undefined,
      content: {
        'application/x-www-form-urlencoded': {
          schema: {
            type: 'object',
            required: undefined,
            properties,
          },
        },
        'application/json': {
          schema: {
            type: 'object',
            required: undefined,
            properties,
          },
        },
      },
      required: undefined,
    };

    const actualResult = addRequestBody({
      properties,
    });

    assert.deepEqual(actualResult, expectedResult);
  });

  it('should handle empty required fields', () => {
    const properties = {
      name: { type: 'string' as const },
    };

    const actualResult = addRequestBody({
      properties,
      requiredFields: [],
    });

    // Check that the schema is the right type and has the required field
    const schema = actualResult.content['application/json']?.schema;
    assert.ok(schema);
    assert.ok('type' in schema && schema.type === 'object');
    if ('required' in schema) {
      assert.deepEqual(schema.required, []);
    }
  });

  it('should support both content types', () => {
    const properties = {
      name: { type: 'string' as const },
    };

    const actualResult = addRequestBody({
      properties,
    });

    assert.ok(actualResult.content['application/json']);
    assert.ok(actualResult.content['application/x-www-form-urlencoded']);
  });

  // Validation tests
  it('should throw error when neither properties nor refString is provided', () => {
    assert.throws(
      () => {
        addRequestBody({
          description: 'Test body',
        });
      },
      {
        name: 'RequestBodyValidationError',
        message: 'Either properties or refString must be provided',
      },
    );
  });

  it('should throw error when both properties and refString are provided', () => {
    assert.throws(
      () => {
        addRequestBody({
          properties: { name: { type: 'string' as const } },
          refString: '#/components/schemas/User',
        });
      },
      {
        name: 'RequestBodyValidationError',
        message: 'Cannot use both properties and refString. Choose one',
      },
    );
  });

  it('should throw error for invalid refString format', () => {
    assert.throws(
      () => {
        addRequestBody({
          refString: 'invalid-reference',
        });
      },
      {
        name: 'RequestBodyValidationError',
        message: 'refString must start with "#/" for local references',
      },
    );
  });

  it('should throw error for invalid OpenAPI reference format', () => {
    assert.throws(
      () => {
        addRequestBody({
          refString: '#/invalid/reference',
        });
      },
      {
        name: 'RequestBodyValidationError',
        message:
          'refString must follow OpenAPI reference format: #/components/schemas/SchemaName or #/definitions/SchemaName',
      },
    );
  });

  it('should throw error for empty properties object', () => {
    assert.throws(
      () => {
        addRequestBody({
          properties: {},
        });
      },
      {
        name: 'RequestBodyValidationError',
        message: 'Properties object cannot be empty',
      },
    );
  });

  it('should throw error for invalid properties type', () => {
    assert.throws(
      () => {
        addRequestBody({
          properties: 'invalid' as any,
        });
      },
      {
        name: 'RequestBodyValidationError',
        message: 'Properties must be an object',
      },
    );
  });

  it('should throw error for required fields not in properties', () => {
    assert.throws(
      () => {
        addRequestBody({
          properties: { name: { type: 'string' as const } },
          requiredFields: ['name', 'email'],
        });
      },
      {
        name: 'RequestBodyValidationError',
        message: 'Required fields [email] not found in properties',
      },
    );
  });

  it('should accept valid refString formats', () => {
    const validRefs = [
      '#/components/schemas/User',
      '#/components/schemas/User-Profile',
      '#/components/schemas/User_Data',
      '#/definitions/User',
      '#/definitions/User-Profile',
    ];

    validRefs.forEach((refString) => {
      assert.doesNotThrow(() => {
        addRequestBody({ refString });
      });
    });
  });
});
