import assert from 'node:assert';
import { describe, it } from 'node:test';
import { addResponseStatus } from './addResponseStatus';
import { HttpStatusCodes } from './common/constants';

describe('addResponseStatus', () => {
  it('should create response status without schema', () => {
    const expectedResult = {
      200: {
        description: 'Success response',
      },
    };

    const actualResult = addResponseStatus({
      statusCode: HttpStatusCodes.OK,
      description: 'Success response',
    });

    assert.deepEqual(actualResult, expectedResult);
  });

  it('should create response status with schema', () => {
    const schema = {
      type: 'object' as const,
      properties: {
        id: { type: 'integer' as const },
        name: { type: 'string' as const },
      },
    };

    const expectedResult = {
      201: {
        description: 'Created successfully',
        content: {
          'application/x-www-form-urlencoded': { schema },
          'application/json': { schema },
        },
      },
    };

    const actualResult = addResponseStatus({
      statusCode: HttpStatusCodes.CREATED,
      description: 'Created successfully',
      schema,
    });

    assert.deepEqual(actualResult, expectedResult);
  });

  it('should work with different status codes', () => {
    const testCases = [
      { statusCode: HttpStatusCodes.OK, expected: 200 },
      { statusCode: HttpStatusCodes.CREATED, expected: 201 },
      { statusCode: HttpStatusCodes.BAD_REQUEST, expected: 400 },
      { statusCode: HttpStatusCodes.NOT_FOUND, expected: 404 },
      { statusCode: HttpStatusCodes.INTERNAL_SERVER, expected: 500 },
    ];

    testCases.forEach(({ statusCode, expected }) => {
      const actualResult = addResponseStatus({
        statusCode,
        description: 'Test response',
      });

      assert.ok(actualResult[expected]);
      assert.strictEqual(actualResult[expected]?.description, 'Test response');
    });
  });

  it('should work with default status code', () => {
    const actualResult = addResponseStatus({
      statusCode: HttpStatusCodes.DEFAULT,
      description: 'Default response',
    });

    assert.ok(actualResult.default);
    assert.strictEqual(actualResult.default?.description, 'Default response');
  });

  it('should handle new status codes', () => {
    const actualResult = addResponseStatus({
      statusCode: HttpStatusCodes.UNPROCESSABLE_ENTITY,
      description: 'Validation error',
    });

    assert.ok(actualResult[422]);
    assert.strictEqual(actualResult[422]?.description, 'Validation error');
  });

  it('should not add content when schema is not provided', () => {
    const actualResult = addResponseStatus({
      statusCode: HttpStatusCodes.OK,
      description: 'Success response',
    });

    assert.ok(actualResult[200]);
    assert.strictEqual(actualResult[200]?.content, undefined);
  });

  it('should add content for both content types when schema is provided', () => {
    const schema = { type: 'string' as const };

    const actualResult = addResponseStatus({
      statusCode: HttpStatusCodes.OK,
      description: 'Success response',
      schema,
    });

    const response = actualResult[200];
    assert.ok(response?.content);
    assert.ok(response.content['application/json']);
    assert.ok(response.content['application/x-www-form-urlencoded']);
    assert.deepEqual(response.content['application/json']?.schema, schema);
    assert.deepEqual(response.content['application/x-www-form-urlencoded']?.schema, schema);
  });

  // Validation tests
  it('should throw error for empty description', () => {
    assert.throws(
      () => {
        addResponseStatus({
          statusCode: HttpStatusCodes.OK,
          description: '',
        });
      },
      {
        name: 'ResponseStatusValidationError',
        message: 'Description cannot be empty',
      },
    );
  });

  it('should throw error for invalid status code', () => {
    assert.throws(
      () => {
        addResponseStatus({
          statusCode: 99 as any,
          description: 'Invalid status',
        });
      },
      {
        name: 'ResponseStatusValidationError',
        message: "Invalid HTTP status code 99. Must be between 100-599 or 'default'",
      },
    );
  });

  it('should throw error for status code too high', () => {
    assert.throws(
      () => {
        addResponseStatus({
          statusCode: 600 as any,
          description: 'Invalid status',
        });
      },
      {
        name: 'ResponseStatusValidationError',
        message: "Invalid HTTP status code 600. Must be between 100-599 or 'default'",
      },
    );
  });

  it('should accept valid status codes', () => {
    const validCodes = [
      HttpStatusCodes.OK,
      HttpStatusCodes.CREATED,
      HttpStatusCodes.BAD_REQUEST,
      HttpStatusCodes.NOT_FOUND,
      HttpStatusCodes.INTERNAL_SERVER,
      HttpStatusCodes.DEFAULT,
    ];

    validCodes.forEach((statusCode) => {
      assert.doesNotThrow(() => {
        addResponseStatus({
          statusCode,
          description: 'Valid status',
        });
      });
    });
  });
});
