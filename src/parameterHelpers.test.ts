import assert from 'node:assert';
import { describe, it } from 'node:test';
import { addFilterParamToQuery } from './addFilterParamToQuery';
import { addHeaderParam, addAuthorizationHeader, addApiKeyHeader, addContentTypeHeader } from './addHeaderParam';
import { addLimitParamToQuery } from './addLimitParamToQuery';
import { addOffsetParamToQuery } from './addOffsetParamToQuery';
import { addPageParamToQuery } from './addPageParamToQuery';
import { addPaginationParams } from './addPaginationParams';
import { addSortParamToQuery } from './addSortParamToQuery';

describe('addLimitParamToQuery', () => {
  it('should create limit parameter with default values', () => {
    const result = addLimitParamToQuery({});

    assert.strictEqual(result.name, 'limit');
    assert.strictEqual(result.in, 'query');
    assert.strictEqual(result.required, false);
    assert.strictEqual(result.description, 'Maximum number of results to return');
    assert.deepStrictEqual(result.schema, {
      type: 'integer',
      minimum: 1,
      maximum: 100,
      default: 10,
    });
  });

  it('should create limit parameter with custom configuration', () => {
    const result = addLimitParamToQuery({
      description: 'Custom limit description',
      defaultValue: 20,
      minimum: 5,
      maximum: 50,
    });

    assert.strictEqual(result.description, 'Custom limit description');
    assert.strictEqual((result.schema as any).default, 20);
    assert.strictEqual((result.schema as any).minimum, 5);
    assert.strictEqual((result.schema as any).maximum, 50);
  });
});

describe('addOffsetParamToQuery', () => {
  it('should create offset parameter with default values', () => {
    const result = addOffsetParamToQuery({});

    assert.strictEqual(result.name, 'offset');
    assert.strictEqual(result.in, 'query');
    assert.strictEqual(result.required, false);
    assert.strictEqual(result.description, 'Number of results to skip');
    assert.deepStrictEqual(result.schema, {
      type: 'integer',
      minimum: 0,
      default: 0,
    });
  });

  it('should create offset parameter with custom configuration', () => {
    const result = addOffsetParamToQuery({
      description: 'Custom offset description',
      defaultValue: 10,
      minimum: 0,
    });

    assert.strictEqual(result.description, 'Custom offset description');
    assert.strictEqual((result.schema as any).default, 10);
    assert.strictEqual((result.schema as any).minimum, 0);
  });
});

describe('addPageParamToQuery', () => {
  it('should create page parameter with default values', () => {
    const result = addPageParamToQuery();

    assert.strictEqual(result.name, 'page');
    assert.strictEqual(result.in, 'query');
    assert.strictEqual(result.required, false);
    assert.strictEqual(result.description, 'Num of page');
    assert.deepStrictEqual(result.schema, {
      type: 'integer',
      minimum: 1,
    });
  });
});

describe('addSortParamToQuery', () => {
  it('should create sort parameter with default values', () => {
    const result = addSortParamToQuery({});

    assert.strictEqual(result.name, 'sort');
    assert.strictEqual(result.in, 'query');
    assert.strictEqual(result.required, false);
    assert.strictEqual(result.description, 'Field to sort by (use "-" prefix for descending order)');
    assert.deepStrictEqual(result.schema, { type: 'string' });
  });

  it('should create sort parameter with allowed fields', () => {
    const result = addSortParamToQuery({
      allowedFields: ['name', 'email'],
      defaultValue: 'name',
    });

    assert.deepStrictEqual((result.schema as any).enum, ['name', 'email', '-name', '-email']);
    assert.strictEqual((result.schema as any).default, 'name');
    assert.strictEqual((result.schema as any).example, 'name');
  });

  it('should create sort parameter without descending options', () => {
    const result = addSortParamToQuery({
      allowedFields: ['name', 'email'],
      allowDescending: false,
    });

    assert.deepStrictEqual((result.schema as any).enum, ['name', 'email']);
    assert.strictEqual(result.description, 'Field to sort by');
  });
});

describe('addFilterParamToQuery', () => {
  it('should create filter parameter with required field name', () => {
    const result = addFilterParamToQuery({ fieldName: 'status' });

    assert.strictEqual(result.name, 'status');
    assert.strictEqual(result.in, 'query');
    assert.strictEqual(result.required, false);
    assert.strictEqual(result.description, 'Filter by status');
    assert.deepStrictEqual(result.schema, { type: 'string' });
  });

  it('should create filter parameter with custom configuration', () => {
    const result = addFilterParamToQuery({
      fieldName: 'role',
      description: 'Filter users by role',
      required: true,
      schema: {
        type: 'string',
        enum: ['admin', 'user'],
      },
    });

    assert.strictEqual(result.name, 'role');
    assert.strictEqual(result.description, 'Filter users by role');
    assert.strictEqual(result.required, true);
    assert.deepStrictEqual(result.schema, {
      type: 'string',
      enum: ['admin', 'user'],
    });
  });
});

describe('addHeaderParam', () => {
  it('should create header parameter with required name', () => {
    const result = addHeaderParam({ name: 'X-Custom-Header' });

    assert.strictEqual(result.name, 'X-Custom-Header');
    assert.strictEqual(result.in, 'header');
    assert.strictEqual(result.required, false);
    assert.strictEqual(result.description, 'X-Custom-Header header');
    assert.deepStrictEqual(result.schema, { type: 'string' });
  });

  it('should create header parameter with custom configuration', () => {
    const result = addHeaderParam({
      name: 'Authorization',
      description: 'Bearer token',
      required: true,
      schema: { type: 'string', pattern: '^Bearer .+' },
    });

    assert.strictEqual(result.name, 'Authorization');
    assert.strictEqual(result.description, 'Bearer token');
    assert.strictEqual(result.required, true);
    assert.deepStrictEqual(result.schema, { type: 'string', pattern: '^Bearer .+' });
  });
});

describe('addAuthorizationHeader', () => {
  it('should create authorization header with defaults', () => {
    const result = addAuthorizationHeader();

    assert.strictEqual(result.name, 'Authorization');
    assert.strictEqual(result.in, 'header');
    assert.strictEqual(result.required, true);
    assert.strictEqual(result.description, 'Bearer token for authentication');
    assert.strictEqual((result.schema as any).type, 'string');
    assert.strictEqual((result.schema as any).pattern, '^Bearer [A-Za-z0-9\\-\\._~\\+\\/]+=*$');
  });

  it('should create authorization header with custom configuration', () => {
    const result = addAuthorizationHeader('Custom auth description', false);

    assert.strictEqual(result.description, 'Custom auth description');
    assert.strictEqual(result.required, false);
  });
});

describe('addApiKeyHeader', () => {
  it('should create API key header with defaults', () => {
    const result = addApiKeyHeader();

    assert.strictEqual(result.name, 'X-API-Key');
    assert.strictEqual(result.in, 'header');
    assert.strictEqual(result.required, true);
    assert.strictEqual(result.description, 'API key for authentication');
    assert.strictEqual((result.schema as any).type, 'string');
    assert.strictEqual((result.schema as any).minLength, 1);
  });
});

describe('addContentTypeHeader', () => {
  it('should create content type header with defaults', () => {
    const result = addContentTypeHeader();

    assert.strictEqual(result.name, 'Content-Type');
    assert.strictEqual(result.in, 'header');
    assert.strictEqual(result.required, false);
    assert.strictEqual(result.description, 'Media type of the request body');
    assert.strictEqual((result.schema as any).type, 'string');
    assert.strictEqual((result.schema as any).example, 'application/json');
  });

  it('should create content type header with allowed types', () => {
    const result = addContentTypeHeader(['application/json', 'application/xml']);

    assert.deepStrictEqual((result.schema as any).enum, ['application/json', 'application/xml']);
    assert.strictEqual((result.schema as any).example, 'application/json');
  });
});

describe('addPaginationParams', () => {
  it('should create page-limit pagination parameters by default', () => {
    const result = addPaginationParams();

    assert.strictEqual(result.length, 2);
    assert.strictEqual(result[0].name, 'page');
    assert.strictEqual(result[1].name, 'limit');
  });

  it('should create offset-limit pagination parameters', () => {
    const result = addPaginationParams({ style: 'offset-limit' });

    assert.strictEqual(result.length, 2);
    assert.strictEqual(result[0].name, 'offset');
    assert.strictEqual(result[1].name, 'limit');
  });

  it('should include sort parameter when requested', () => {
    const result = addPaginationParams({
      includeSort: true,
      sortConfig: { allowedFields: ['name', 'email'] },
    });

    assert.strictEqual(result.length, 3);
    assert.strictEqual(result[0].name, 'page');
    assert.strictEqual(result[1].name, 'limit');
    assert.strictEqual(result[2].name, 'sort');
  });

  it('should use custom configuration for parameters', () => {
    const result = addPaginationParams({
      limitConfig: { defaultValue: 25, maximum: 200 },
      offsetConfig: { defaultValue: 10 },
      style: 'offset-limit',
    });

    assert.strictEqual((result[1].schema as any).default, 25);
    assert.strictEqual((result[1].schema as any).maximum, 200);
    assert.strictEqual((result[0].schema as any).default, 10);
  });
});
