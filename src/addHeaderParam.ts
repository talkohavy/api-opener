import type { SwaggerParameter } from './types';

export type AddHeaderParamProps = {
  name: string;
  description?: string;
  required?: boolean;
  schema?: any;
};

/**
 * Creates a standardized header parameter for OpenAPI specifications.
 *
 * @description This function generates a header parameter that can be used in API routes.
 * Common use cases include API keys, authorization tokens, content types, and custom headers.
 *
 * @param props - Configuration object for the header parameter
 * @param props.name - The name of the header parameter (e.g., 'Authorization', 'x-api-key')
 * @param props.description - Optional description of the header
 * @param props.required - Whether the header is required (defaults to false)
 * @param props.schema - Optional schema definition for the header value
 *
 * @returns A SwaggerParameter object representing the header parameter
 *
 * @example
 * ```typescript
 * // API Key header
 * const apiKeyHeader = addHeaderParam({
 *   name: 'x-api-key',
 *   description: 'API key for authentication',
 *   required: true,
 *   schema: { type: 'string' }
 * });
 *
 * // Content-Type header
 * const contentTypeHeader = addHeaderParam({
 *   name: 'Content-Type',
 *   description: 'Media type of the request body',
 *   required: true,
 *   schema: {
 *     type: 'string',
 *     enum: ['application/json', 'application/xml']
 *   }
 * });
 *
 * // Authorization header
 * const authHeader = addHeaderParam({
 *   name: 'Authorization',
 *   description: 'Bearer token for authentication',
 *   required: true,
 *   schema: {
 *     type: 'string',
 *     pattern: '^Bearer [A-Za-z0-9\\-\\._~\\+\\/]+=*$'
 *   }
 * });
 * ```
 */
export function addHeaderParam(props: AddHeaderParamProps): SwaggerParameter {
  const { name, description = `${name} header`, required = false, schema = { type: 'string' } } = props;

  return {
    name,
    in: 'header',
    description,
    required,
    schema,
  };
}

/**
 * Creates a standardized Authorization header parameter.
 *
 * @param description - Optional description (defaults to "Bearer token for authentication")
 * @param required - Whether the header is required (defaults to true)
 *
 * @returns A SwaggerParameter object representing the Authorization header
 *
 * @example
 * ```typescript
 * const authHeader = addAuthorizationHeader();
 *
 * const customAuthHeader = addAuthorizationHeader(
 *   'JWT token for user authentication',
 *   true
 * );
 * ```
 */
export function addAuthorizationHeader(
  description = 'Bearer token for authentication',
  required = true,
): SwaggerParameter {
  return addHeaderParam({
    name: 'Authorization',
    description,
    required,
    schema: {
      type: 'string',
      pattern: '^Bearer [A-Za-z0-9\\-\\._~\\+\\/]+=*$',
      example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    },
  });
}

/**
 * Creates a standardized x-api-key header parameter.
 *
 * @param description - Optional description (defaults to "API key for authentication")
 * @param required - Whether the header is required (defaults to true)
 *
 * @returns A SwaggerParameter object representing the x-api-key header
 *
 * @example
 * ```typescript
 * const apiKeyHeader = addApiKeyHeader();
 *
 * const customApiKeyHeader = addApiKeyHeader(
 *   'Your application API key',
 *   true
 * );
 * ```
 */
export function addApiKeyHeader(description = 'API key for authentication', required = true): SwaggerParameter {
  return addHeaderParam({
    name: 'x-api-key',
    description,
    required,
    schema: {
      type: 'string',
      minLength: 1,
      example: 'abc123def456',
    },
  });
}

/**
 * Creates a standardized Content-Type header parameter.
 *
 * @param allowedTypes - Optional array of allowed content types
 * @param description - Optional description
 * @param required - Whether the header is required (defaults to false)
 *
 * @returns A SwaggerParameter object representing the Content-Type header
 *
 * @example
 * ```typescript
 * const contentTypeHeader = addContentTypeHeader();
 *
 * const restrictedContentType = addContentTypeHeader(
 *   ['application/json', 'application/xml'],
 *   'Supported content types',
 *   true
 * );
 * ```
 */
export function addContentTypeHeader(
  allowedTypes?: string[],
  description = 'Media type of the request body',
  required = false,
): SwaggerParameter {
  const schema: any = { type: 'string' };

  if (allowedTypes && allowedTypes.length > 0) {
    schema.enum = allowedTypes;
    schema.example = allowedTypes[0];
  } else {
    schema.example = 'application/json';
  }

  return addHeaderParam({
    name: 'Content-Type',
    description,
    required,
    schema,
  });
}
