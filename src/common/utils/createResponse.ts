import type { SwaggerResponse } from '../constants';

/**
 * Configuration for creating a response with multiple content types
 */
export interface ResponseConfig {
  /** HTTP status code */
  statusCode: number | 'default';
  /** Response description */
  description: string;
  /** Response schema */
  schema?: any;
  /** Supported content types (defaults to JSON and form-urlencoded) */
  contentTypes?: string[];
  /** Response headers */
  headers?: Record<
    string,
    {
      description?: string;
      schema?: any;
      required?: boolean;
    }
  >;
  /** Examples for different content types */
  examples?: Record<string, any>;
}

/**
 * Creates a flexible response with support for multiple content types and headers.
 *
 * @param config - Configuration object for the response
 * @returns A SwaggerResponse object with the specified configuration
 *
 * @example
 * ```typescript
 * const response = createResponse({
 *   statusCode: 200,
 *   description: 'User data retrieved successfully',
 *   schema: { $ref: '#/components/schemas/User' },
 *   contentTypes: ['application/json', 'application/xml'],
 *   headers: {
 *     'X-Rate-Limit': {
 *       description: 'Remaining requests in the current window',
 *       schema: { type: 'integer' }
 *     }
 *   },
 *   examples: {
 *     'application/json': { id: 1, name: 'John Doe' }
 *   }
 * });
 * ```
 */
export function createResponse(config: ResponseConfig): SwaggerResponse {
  const {
    statusCode,
    description,
    schema,
    contentTypes = ['application/json', 'application/x-www-form-urlencoded'],
    headers,
    examples,
  } = config;

  const response: any = {
    description,
    ...(headers && { headers }),
  };

  if (schema) {
    response.content = {};

    contentTypes.forEach((contentType) => {
      response.content[contentType] = {
        schema,
        ...(examples?.[contentType] && {
          example: examples[contentType],
        }),
      };
    });
  }

  return {
    [statusCode]: response,
  };
}
