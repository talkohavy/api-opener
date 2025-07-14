import assert from 'node:assert';
import { describe, it } from 'node:test';
import { addIdParamToPath } from './addIdParamToPath';

describe('addIdParamToPath', () => {
  it('should create ID parameter with default values', () => {
    const expectedResult = {
      name: 'id',
      in: 'path',
      description: 'ID of the resource',
      required: true,
      schema: { type: 'string' },
    };

    const actualResult = addIdParamToPath({});

    assert.deepEqual(actualResult, expectedResult);
  });

  it('should create ID parameter with custom description', () => {
    const expectedResult = {
      name: 'id',
      in: 'path',
      description: 'User ID',
      required: true,
      schema: { type: 'string' },
    };

    const actualResult = addIdParamToPath({
      description: 'User ID',
    });

    assert.deepEqual(actualResult, expectedResult);
  });

  it('should create ID parameter with custom schema', () => {
    const customSchema = { type: 'integer' as const, minimum: 1 };
    const expectedResult = {
      name: 'id',
      in: 'path',
      description: 'ID of the resource',
      required: true,
      schema: customSchema,
    };

    const actualResult = addIdParamToPath({
      schema: customSchema,
    });

    assert.deepEqual(actualResult, expectedResult);
  });

  it('should create ID parameter with both custom description and schema', () => {
    const customSchema = { type: 'integer' as const, minimum: 1 };
    const expectedResult = {
      name: 'id',
      in: 'path',
      description: 'Product ID',
      required: true,
      schema: customSchema,
    };

    const actualResult = addIdParamToPath({
      description: 'Product ID',
      schema: customSchema,
    });

    assert.deepEqual(actualResult, expectedResult);
  });

  it('should always return required parameter', () => {
    const actualResult = addIdParamToPath({});
    assert.strictEqual(actualResult.required, true);
  });

  it('should always return parameter in path', () => {
    const actualResult = addIdParamToPath({});
    assert.strictEqual(actualResult.in, 'path');
  });

  it('should always return parameter named id', () => {
    const actualResult = addIdParamToPath({});
    assert.strictEqual(actualResult.name, 'id');
  });

  it('should use default description when empty string is provided', () => {
    const actualResult = addIdParamToPath({
      description: '',
    });
    assert.strictEqual(actualResult.description, 'ID of the resource');
  });

  it('should handle various schema types', () => {
    const schemas = [
      { type: 'string' as const },
      { type: 'integer' as const },
      { type: 'number' as const },
      { type: 'string' as const, format: 'date' as const },
      { $ref: '#/components/schemas/IdType' },
    ];

    schemas.forEach((schema) => {
      const actualResult = addIdParamToPath({ schema });
      assert.deepEqual(actualResult.schema, schema);
    });
  });
});
