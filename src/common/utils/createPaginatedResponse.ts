import { HttpStatusCodes, type SwaggerResponse } from '../constants';

/**
 * Configuration for creating paginated responses
 */
export interface PaginatedResponseConfig {
  /** Item schema for the paginated data */
  itemSchema: any;
  /** Description of the response */
  description?: string;
  /** Whether to include metadata like totalCount, hasNext, etc. */
  includeMetadata?: boolean;
  /** Custom metadata schema */
  metadataSchema?: any;
}

/**
 * Creates a paginated response with items and optional metadata.
 *
 * @param config - Configuration for the paginated response
 * @returns A SwaggerResponse object with paginated data structure
 *
 * @example
 * ```typescript
 * const response = createPaginatedResponse({
 *   itemSchema: { $ref: '#/components/schemas/User' },
 *   description: 'List of users with pagination',
 *   includeMetadata: true
 * });
 * ```
 */
export function createPaginatedResponse(config: PaginatedResponseConfig): SwaggerResponse {
  const { itemSchema, description = 'Paginated results', includeMetadata = true, metadataSchema } = config;

  const defaultMetadataSchema = {
    type: 'object',
    properties: {
      totalCount: {
        type: 'integer',
        description: 'Total number of items across all pages',
      },
      page: {
        type: 'integer',
        description: 'Current page number',
      },
      limit: {
        type: 'integer',
        description: 'Number of items per page',
      },
      totalPages: {
        type: 'integer',
        description: 'Total number of pages',
      },
      hasNext: {
        type: 'boolean',
        description: 'Whether there are more pages',
      },
      hasPrevious: {
        type: 'boolean',
        description: 'Whether there are previous pages',
      },
    },
  };

  const schema = {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        items: itemSchema,
        description: 'Array of items for the current page',
      },
      ...(includeMetadata && {
        meta: metadataSchema || defaultMetadataSchema,
      }),
    },
    required: ['data', ...(includeMetadata ? ['meta'] : [])],
  };

  return {
    [HttpStatusCodes.OK]: {
      description,
      content: {
        'application/json': {
          schema,
          example: {
            data: [
              { id: 1, name: 'Item 1' },
              { id: 2, name: 'Item 2' },
            ],
            ...(includeMetadata && {
              meta: {
                totalCount: 100,
                page: 1,
                limit: 10,
                totalPages: 10,
                hasNext: true,
                hasPrevious: false,
              },
            }),
          },
        },
        'application/x-www-form-urlencoded': { schema },
      },
    },
  };
}

/**
 * Creates a cursor-based paginated response.
 *
 * @param config - Configuration for the cursor-based response
 * @returns A SwaggerResponse object with cursor-based pagination
 *
 * @example
 * ```typescript
 * const response = createCursorPaginatedResponse({
 *   itemSchema: { $ref: '#/components/schemas/User' },
 *   description: 'Cursor-based paginated users'
 * });
 * ```
 */
export function createCursorPaginatedResponse(
  config: Pick<PaginatedResponseConfig, 'itemSchema' | 'description'>,
): SwaggerResponse {
  const { itemSchema, description = 'Cursor-based paginated results' } = config;

  const schema = {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        items: itemSchema,
        description: 'Array of items for the current page',
      },
      pagination: {
        type: 'object',
        properties: {
          nextCursor: {
            type: 'string',
            nullable: true,
            description: 'Cursor for the next page, null if no more pages',
          },
          prevCursor: {
            type: 'string',
            nullable: true,
            description: 'Cursor for the previous page, null if first page',
          },
          hasNext: {
            type: 'boolean',
            description: 'Whether there are more pages',
          },
          hasPrevious: {
            type: 'boolean',
            description: 'Whether there are previous pages',
          },
        },
        required: ['nextCursor', 'prevCursor', 'hasNext', 'hasPrevious'],
      },
    },
    required: ['data', 'pagination'],
  };

  return {
    [HttpStatusCodes.OK]: {
      description,
      content: {
        'application/json': {
          schema,
          example: {
            data: [
              { id: 1, name: 'Item 1' },
              { id: 2, name: 'Item 2' },
            ],
            pagination: {
              nextCursor: 'eyJpZCI6Mn0=',
              prevCursor: null,
              hasNext: true,
              hasPrevious: false,
            },
          },
        },
        'application/x-www-form-urlencoded': { schema },
      },
    },
  };
}
