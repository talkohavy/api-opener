import assert from 'node:assert';
import { describe, it } from 'node:test';
import { createApiRoute } from './createApiRoute';

describe('createApiRoute', () => {
  it('should create a basic API route', () => {
    const expectedResult = {
      '/users': {
        get: {
          tags: ['Rest'],
        },
      },
    };

    const actualResult = createApiRoute({
      route: '/users',
      method: 'get',
    });

    assert.deepEqual(actualResult, expectedResult);
  });

  it('should create an API route with all properties', () => {
    const parameters = [
      {
        name: 'page',
        in: 'query' as const,
        required: false,
        schema: { type: 'integer' as const, minimum: 1 },
      },
    ];

    const requestBody = {
      description: 'User data',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object' as const,
            properties: {
              name: { type: 'string' as const },
            },
          },
        },
      },
    };

    const responses = {
      200: {
        description: 'Success',
      },
    };

    const expectedResult = {
      '/users/{id}': {
        put: {
          tags: ['Users'],
          summary: 'Update user',
          description: 'Update user information',
          operationId: 'updateUser',
          parameters,
          requestBody,
          responses,
          security: [{ user_auth: [] }],
        },
      },
    };

    const actualResult = createApiRoute({
      route: '/users/{id}',
      method: 'put',
      tag: 'Users',
      summary: 'Update user',
      description: 'Update user information',
      operationId: 'updateUser',
      parameters,
      requestBody,
      responses,
      security: [{ user_auth: [] }],
    });

    assert.deepEqual(actualResult, expectedResult);
  });

  it('should use default tag when no tag is provided', () => {
    const actualResult = createApiRoute({
      route: '/test',
      method: 'get',
    });

    assert.deepEqual(actualResult['/test']?.get?.tags, ['Rest']);
  });

  it('should work with different HTTP methods', () => {
    const methods = ['get', 'post', 'put', 'patch', 'delete'] as const;

    methods.forEach((method) => {
      const actualResult = createApiRoute({
        route: '/test',
        method,
      });

      assert.ok(actualResult['/test']?.[method]);
      assert.deepEqual(actualResult['/test']?.[method]?.tags, ['Rest']);
    });
  });

  it('should handle custom tags', () => {
    const customTag = {
      name: 'Users',
      description: 'User management',
      externalDocs: {
        url: 'https://docs.example.com/users',
        description: 'Learn more',
      },
    };

    const actualResult = createApiRoute({
      route: '/users',
      method: 'get',
      tag: customTag,
    });

    assert.deepEqual(actualResult['/users']?.get?.tags, [customTag]);
  });

  it('should handle string tags', () => {
    const actualResult = createApiRoute({
      route: '/users',
      method: 'get',
      tag: 'Users',
    });

    assert.deepEqual(actualResult['/users']?.get?.tags, ['Users']);
  });

  it('should not include undefined properties', () => {
    const actualResult = createApiRoute({
      route: '/users',
      method: 'get',
      summary: 'Get users',
      // description, operationId, parameters, requestBody, responses, security are undefined
    });

    const routeMethod = actualResult['/users']?.get;
    assert.ok(routeMethod);
    assert.strictEqual(routeMethod.summary, 'Get users');
    assert.strictEqual(routeMethod.description, undefined);
    assert.strictEqual(routeMethod.operationId, undefined);
    assert.strictEqual(routeMethod.parameters, undefined);
    assert.strictEqual(routeMethod.requestBody, undefined);
    assert.strictEqual(routeMethod.responses, undefined);
    assert.strictEqual(routeMethod.security, undefined);
  });

  it('should create correct route structure', () => {
    const actualResult = createApiRoute({
      route: '/api/v1/users/{id}',
      method: 'delete',
      tag: 'Users',
    });

    // Check the structure is correct
    assert.ok(actualResult['/api/v1/users/{id}']);
    assert.ok(actualResult['/api/v1/users/{id}']?.delete);
    assert.strictEqual(Object.keys(actualResult).length, 1);
    assert.strictEqual(Object.keys(actualResult['/api/v1/users/{id}'] || {}).length, 1);
  });

  // Validation tests
  it('should throw error for empty route', () => {
    assert.throws(
      () => {
        createApiRoute({
          route: '',
          method: 'get',
        });
      },
      {
        name: 'ApiRouteValidationError',
        message: 'Route cannot be empty',
      },
    );
  });

  it('should throw error for route not starting with /', () => {
    assert.throws(
      () => {
        createApiRoute({
          route: 'users',
          method: 'get',
        });
      },
      {
        name: 'ApiRouteValidationError',
        message: 'Route must start with a forward slash "/"',
      },
    );
  });

  it('should throw error for route with invalid characters', () => {
    assert.throws(
      () => {
        createApiRoute({
          route: '/users/<id>',
          method: 'get',
        });
      },
      {
        name: 'ApiRouteValidationError',
        message: 'Route contains invalid characters. Use {paramName} for path parameters',
      },
    );
  });

  it('should throw error for empty path parameter', () => {
    assert.throws(
      () => {
        createApiRoute({
          route: '/users/{}',
          method: 'get',
        });
      },
      {
        name: 'ApiRouteValidationError',
        message: 'Path parameter name cannot be empty',
      },
    );
  });

  it('should throw error for invalid path parameter name', () => {
    assert.throws(
      () => {
        createApiRoute({
          route: '/users/{id@invalid}',
          method: 'get',
        });
      },
      {
        name: 'ApiRouteValidationError',
        message: 'Invalid path parameter name "id@invalid". Use only alphanumeric characters, underscores, and hyphens',
      },
    );
  });

  it('should throw error for invalid HTTP method', () => {
    assert.throws(
      () => {
        createApiRoute({
          route: '/users',
          method: 'INVALID' as any,
        });
      },
      {
        name: 'ApiRouteValidationError',
        message: 'Invalid HTTP method "INVALID". Must be one of: get, post, put, patch, delete',
      },
    );
  });

  it('should accept valid route formats', () => {
    const validRoutes = [
      '/users',
      '/users/{id}',
      '/users/{user_id}/posts/{post-id}',
      '/api/v1/users/{userId}',
      '/deeply/nested/route/{param1}/and/{param2}',
    ];

    validRoutes.forEach((route) => {
      assert.doesNotThrow(() => {
        createApiRoute({ route, method: 'get' });
      });
    });
  });
});
