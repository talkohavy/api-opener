import { deepMerge } from '@talkohavy/lodash';
import type { SwaggerRoute, SwaggerTag } from './types';

export type CreateSwaggerApiDocsProps = {
  title?: string;
  description?: string;
  version?: string;
  baseUrl: string;
  routes: Array<SwaggerRoute>;
  extendedTags?: Array<SwaggerTag>;
  definitions?: any;
  responses?: any;
  contact?: {
    name?: string;
    url?: string;
    email?: string;
  };
  license?: {
    name?: string;
    url?: string;
  };
  termsOfService?: string;
};

/**
 * Creates a complete OpenAPI 3.1.0 specification document.
 *
 * @description This is the main function that generates a complete OpenAPI specification
 * from your API routes and configuration. It combines all route definitions, schemas,
 * and metadata into a single OpenAPI document that can be used with Swagger UI,
 * documentation generators, or API testing tools.
 *
 * @param props - Configuration object for the OpenAPI document
 * @param props.title - Title of the API (defaults to "API Documentation")
 * @param props.description - Description of the API (defaults to "API documentation generated with api-opener")
 * @param props.version - Version of the API (defaults to "1.0.0")
 * @param props.baseUrl - Base URL where the API is hosted (required)
 * @param props.routes - Array of API routes created with createApiRoute
 * @param props.extendedTags - Optional array of tag definitions with descriptions
 * @param props.definitions - Optional schema definitions for components
 * @param props.responses - Optional reusable response definitions
 * @param props.contact - Optional contact information for the API
 * @param props.license - Optional license information for the API
 * @param props.termsOfService - Optional URL to terms of service
 *
 * @returns A complete OpenAPI 3.1.0 specification object
 *
 * @example
 * ```typescript
 * // Basic usage
 * const apiDocs = createSwaggerApiDocs({
 *   title: 'My API',
 *   description: 'A sample API built with api-opener',
 *   version: '1.0.0',
 *   baseUrl: 'https://api.example.com',
 *   routes: [userRoutes, postRoutes]
 * });
 *
 * // With full configuration
 * const apiDocs = createSwaggerApiDocs({
 *   title: 'E-commerce API',
 *   description: 'REST API for e-commerce platform',
 *   version: '2.1.0',
 *   baseUrl: 'https://api.shop.com',
 *   routes: [userRoutes, productRoutes, orderRoutes],
 *   contact: {
 *     name: 'API Support',
 *     email: 'support@shop.com',
 *     url: 'https://shop.com/support'
 *   },
 *   license: {
 *     name: 'MIT',
 *     url: 'https://opensource.org/licenses/MIT'
 *   },
 *   definitions: { User, Product, Order }
 * });
 * ```
 */
export function createSwaggerApiDocs(props: CreateSwaggerApiDocsProps) {
  const {
    title = 'API Documentation',
    description = 'API documentation generated with api-opener',
    version = '1.0.0',
    baseUrl,
    routes,
    extendedTags = [],
    definitions = undefined,
    responses = undefined,
    contact,
    license,
    termsOfService,
  } = props;

  const mergedRoutes = routes.reduce((acc, currentRoute) => deepMerge(acc, currentRoute), {});

  // Parse baseUrl to extract server information
  const serverUrl = baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`;

  return {
    openapi: '3.1.0',
    info: {
      title,
      description,
      version,
      ...(contact && { contact }),
      ...(license && { license }),
      ...(termsOfService && { termsOfService }),
    },
    servers: [
      {
        url: serverUrl,
        description: 'API Server',
      },
    ],
    tags: extendedTags,
    paths: mergedRoutes,
    ...(definitions && {
      components: {
        schemas: definitions,
        ...(responses && { responses }),
      },
    }),
  };
}
