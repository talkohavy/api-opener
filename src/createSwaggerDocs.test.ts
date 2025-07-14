import assert from 'node:assert';
import { describe, it } from 'node:test';
import type { SwaggerRoute } from './types';
import { createSwaggerApiDocs } from './createSwaggerDocs';

describe('createSwaggerApiDocs', () => {
  it('should create basic swagger documentation', () => {
    const routes: SwaggerRoute[] = [
      {
        '/users': {
          get: {
            tags: ['Users'],
            summary: 'Get users',
          },
        },
      },
    ];

    const expectedStructure = {
      openapi: '3.1.0',
      info: {
        title: 'API Documentation',
        description: 'API documentation generated with api-opener',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'https://api.example.com',
          description: 'API Server',
        },
      ],
      tags: [],
      paths: {
        '/users': {
          get: {
            tags: ['Users'],
            summary: 'Get users',
          },
        },
      },
    };

    const actualResult = createSwaggerApiDocs({
      baseUrl: 'api.example.com',
      routes,
    });

    assert.deepEqual(actualResult, expectedStructure);
  });

  it('should use custom configuration', () => {
    const routes: SwaggerRoute[] = [
      {
        '/users': {
          get: {
            tags: ['Users'],
            summary: 'Get users',
          },
        },
      },
    ];

    const extendedTags = [
      {
        name: 'Users',
        description: 'User management operations',
      },
    ];

    const contact = {
      name: 'API Support',
      url: 'https://support.example.com',
      email: 'support@example.com',
    };

    const license = {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    };

    const expectedStructure = {
      openapi: '3.1.0',
      info: {
        title: 'My API',
        description: 'Custom API description',
        version: '2.0.0',
        contact,
        license,
        termsOfService: 'https://example.com/terms',
      },
      servers: [
        {
          url: 'https://api.example.com',
          description: 'API Server',
        },
      ],
      tags: extendedTags,
      paths: {
        '/users': {
          get: {
            tags: ['Users'],
            summary: 'Get users',
          },
        },
      },
    };

    const actualResult = createSwaggerApiDocs({
      title: 'My API',
      description: 'Custom API description',
      version: '2.0.0',
      baseUrl: 'https://api.example.com',
      routes,
      extendedTags,
      contact,
      license,
      termsOfService: 'https://example.com/terms',
    });

    assert.deepEqual(actualResult, expectedStructure);
  });

  it('should handle baseUrl with and without protocol', () => {
    const routes: SwaggerRoute[] = [
      {
        '/test': {
          get: {
            tags: ['Test'],
          },
        },
      },
    ];

    // Test with protocol
    const resultWithProtocol = createSwaggerApiDocs({
      baseUrl: 'https://api.example.com',
      routes,
    });

    assert.strictEqual(resultWithProtocol.servers[0]?.url, 'https://api.example.com');

    // Test without protocol
    const resultWithoutProtocol = createSwaggerApiDocs({
      baseUrl: 'api.example.com',
      routes,
    });

    assert.strictEqual(resultWithoutProtocol.servers[0]?.url, 'https://api.example.com');
  });

  it('should merge multiple routes correctly', () => {
    const routes: SwaggerRoute[] = [
      {
        '/users': {
          get: {
            tags: ['Users'],
            summary: 'Get users',
          },
        },
      },
      {
        '/users': {
          post: {
            tags: ['Users'],
            summary: 'Create user',
          },
        },
      },
      {
        '/products': {
          get: {
            tags: ['Products'],
            summary: 'Get products',
          },
        },
      },
    ];

    const expectedPaths = {
      '/users': {
        get: {
          tags: ['Users'],
          summary: 'Get users',
        },
        post: {
          tags: ['Users'],
          summary: 'Create user',
        },
      },
      '/products': {
        get: {
          tags: ['Products'],
          summary: 'Get products',
        },
      },
    };

    const actualResult = createSwaggerApiDocs({
      baseUrl: 'api.example.com',
      routes,
    });

    assert.deepEqual(actualResult.paths, expectedPaths);
  });

  it('should handle definitions and responses in components', () => {
    const routes: SwaggerRoute[] = [
      {
        '/users': {
          get: {
            tags: ['Users'],
          },
        },
      },
    ];

    const definitions = {
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
        },
      },
    };

    const responses = {
      NotFound: {
        description: 'Resource not found',
      },
    };

    const actualResult = createSwaggerApiDocs({
      baseUrl: 'api.example.com',
      routes,
      definitions,
      responses,
    });

    assert.ok(actualResult.components);
    assert.deepEqual(actualResult.components.schemas, definitions);
    assert.deepEqual(actualResult.components.responses, responses);
  });

  it('should not include components when definitions are not provided', () => {
    const routes: SwaggerRoute[] = [
      {
        '/users': {
          get: {
            tags: ['Users'],
          },
        },
      },
    ];

    const actualResult = createSwaggerApiDocs({
      baseUrl: 'api.example.com',
      routes,
    });

    assert.strictEqual(actualResult.components, undefined);
  });

  it('should handle empty routes array', () => {
    const actualResult = createSwaggerApiDocs({
      baseUrl: 'api.example.com',
      routes: [],
    });

    assert.deepEqual(actualResult.paths, {});
  });
});
