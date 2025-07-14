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
