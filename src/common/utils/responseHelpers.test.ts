import assert from 'node:assert';
import { describe, it } from 'node:test';
import { createConflictResponse } from './createConflictResponse';
import { createErrorResponseTemplate, createCommonErrorTemplates } from './createErrorResponseTemplates';
import { createForbiddenResponse } from './createForbiddenResponse';
import { createNoContentResponse } from './createNoContentResponse';
import { createPaginatedResponse, createCursorPaginatedResponse } from './createPaginatedResponse';
import { createResponse } from './createResponse';
import { createTooManyRequestsResponse } from './createTooManyRequestsResponse';
import { createUnprocessableEntityResponse } from './createUnprocessableEntityResponse';

describe('createNoContentResponse', () => {
  it('should create no content response with default description', () => {
    const result = createNoContentResponse();

    assert.strictEqual(result[204]?.description, 'No Content');
    assert.strictEqual(result[204]?.content, undefined);
  });

  it('should create no content response with custom description', () => {
    const result = createNoContentResponse('User deleted successfully');

    assert.strictEqual(result[204]?.description, 'User deleted successfully');
  });
});

describe('createForbiddenResponse', () => {
  it('should create forbidden response with default description', () => {
    const result = createForbiddenResponse();

    assert.strictEqual(result[403]!.description, 'Forbidden');
    assert.strictEqual(result[403]!.content, undefined);
  });

  it('should create forbidden response with schema', () => {
    const schema = { type: 'object', properties: { message: { type: 'string' } } };
    const result = createForbiddenResponse('Access denied', schema);

    assert.strictEqual(result[403]!.description, 'Access denied');
    assert.deepStrictEqual(result[403]!.content?.['application/json'].schema, schema);
  });
});

describe('createConflictResponse', () => {
  it('should create conflict response with default description', () => {
    const result = createConflictResponse();

    assert.strictEqual(result[409]!.description, 'Conflict');
  });

  it('should create conflict response with custom description and schema', () => {
    const schema = { $ref: '#/components/schemas/Error' };
    const result = createConflictResponse('User already exists', schema);

    assert.strictEqual(result[409]!.description, 'User already exists');
    assert.deepStrictEqual(result[409]!.content?.['application/json'].schema, schema);
  });
});

describe('createUnprocessableEntityResponse', () => {
  it('should create unprocessable entity response', () => {
    const result = createUnprocessableEntityResponse();

    assert.strictEqual(result[422]!.description, 'Unprocessable Entity');
  });

  it('should create unprocessable entity response with custom description', () => {
    const result = createUnprocessableEntityResponse('Validation failed');

    assert.strictEqual(result[422]!.description, 'Validation failed');
  });
});

describe('createTooManyRequestsResponse', () => {
  it('should create too many requests response', () => {
    const result = createTooManyRequestsResponse();

    assert.strictEqual(result[429]!.description, 'Too Many Requests');
  });

  it('should create too many requests response with custom description', () => {
    const result = createTooManyRequestsResponse('Rate limit exceeded');

    assert.strictEqual(result[429]!.description, 'Rate limit exceeded');
  });
});

describe('createResponse', () => {
  it('should create response with basic configuration', () => {
    const result = createResponse({
      statusCode: 200,
      description: 'Success',
      schema: { type: 'object' },
    });

    assert.strictEqual(result[200]!.description, 'Success');
    assert.deepStrictEqual(result[200]!.content?.['application/json'].schema, { type: 'object' });
  });

  it('should create response with custom content types', () => {
    const result = createResponse({
      statusCode: 200,
      description: 'Success',
      schema: { type: 'object' },
      contentTypes: ['application/json', 'application/xml'],
    });

    assert.ok(result[200]!.content?.['application/json']);
    assert.ok(result[200]!.content?.['application/xml']);
  });

  it('should create response with headers', () => {
    const result = createResponse({
      statusCode: 200,
      description: 'Success',
      headers: {
        'X-Rate-Limit': {
          description: 'Rate limit',
          schema: { type: 'integer' },
        },
      },
    });

    assert.deepStrictEqual(result[200]!.headers, {
      'X-Rate-Limit': {
        description: 'Rate limit',
        schema: { type: 'integer' },
      },
    });
  });

  it('should create response with examples', () => {
    const result = createResponse({
      statusCode: 200,
      description: 'Success',
      schema: { type: 'object' },
      examples: {
        'application/json': { id: 1, name: 'Test' },
      },
    });

    assert.deepStrictEqual(result[200]!.content?.['application/json'].example, { id: 1, name: 'Test' });
  });
});

describe('createErrorResponseTemplate', () => {
  it('should create standard error response template', () => {
    const result = createErrorResponseTemplate(400, 'Bad Request', 'BAD_REQUEST');

    assert.strictEqual(result[400]!.description, 'Bad Request');
    assert.ok(result[400]!.content?.['application/json'].schema);
    assert.strictEqual(result[400]!.content?.['application/json'].example.error.code, 'BAD_REQUEST');
  });

  it('should create validation error response template', () => {
    const result = createErrorResponseTemplate(422, 'Validation Error', 'VALIDATION_ERROR', true);

    assert.strictEqual(result[422]!.description, 'Validation Error');
    assert.ok(result[422]!.content?.['application/json'].example.error.details);
  });
});

describe('createCommonErrorTemplates', () => {
  it('should create all common error templates', () => {
    const templates = createCommonErrorTemplates();

    assert.ok(templates.badRequest[400]);
    assert.ok(templates.unauthorized[401]);
    assert.ok(templates.forbidden[403]);
    assert.ok(templates.notFound[404]);
    assert.ok(templates.conflict[409]);
    assert.ok(templates.validationError[422]);
    assert.ok(templates.tooManyRequests[429]);
    assert.ok(templates.internalServerError[500]);
    assert.ok(templates.serviceUnavailable[503]);
  });
});

describe('createPaginatedResponse', () => {
  it('should create paginated response with metadata', () => {
    const result = createPaginatedResponse({
      itemSchema: { type: 'object' },
      description: 'Paginated data',
    });

    assert.strictEqual(result[200]!.description, 'Paginated data');
    assert.strictEqual(result[200]!.content?.['application/json'].schema.properties.data.type, 'array');
    assert.ok(result[200]!.content?.['application/json'].schema.properties.meta);
    assert.ok(result[200]!.content?.['application/json'].example.meta);
  });

  it('should create paginated response without metadata', () => {
    const result = createPaginatedResponse({
      itemSchema: { type: 'object' },
      includeMetadata: false,
    });

    assert.strictEqual(result[200]!.content?.['application/json'].schema.properties.meta, undefined);
    assert.strictEqual(result[200]!.content?.['application/json'].example.meta, undefined);
  });

  it('should create paginated response with custom metadata schema', () => {
    const customMetadata = { type: 'object', properties: { total: { type: 'number' } } };
    const result = createPaginatedResponse({
      itemSchema: { type: 'object' },
      metadataSchema: customMetadata,
    });

    assert.deepStrictEqual(result[200]!.content?.['application/json'].schema.properties.meta, customMetadata);
  });
});

describe('createCursorPaginatedResponse', () => {
  it('should create cursor-based paginated response', () => {
    const result = createCursorPaginatedResponse({
      itemSchema: { type: 'object' },
      description: 'Cursor paginated data',
    });

    assert.strictEqual(result[200]!.description, 'Cursor paginated data');
    assert.strictEqual(result[200]!.content?.['application/json'].schema.properties.data.type, 'array');
    assert.ok(result[200]!.content?.['application/json'].schema.properties.pagination);
    assert.ok(result[200]!.content?.['application/json'].example.pagination);
    assert.strictEqual(result[200]!.content?.['application/json'].example.pagination.nextCursor, 'eyJpZCI6Mn0=');
  });
});
