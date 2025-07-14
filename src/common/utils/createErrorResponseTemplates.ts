import { HttpStatusCodes, type SwaggerResponse } from '../constants';

export const ErrorResponseSchema = {
  type: 'object',
  properties: {
    error: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
          description: 'Error code for programmatic handling',
        },
        message: {
          type: 'string',
          description: 'Human-readable error message',
        },
        details: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              field: { type: 'string' },
              message: { type: 'string' },
            },
          },
          description: 'Detailed error information (optional)',
        },
        timestamp: {
          type: 'string',
          format: 'date-time',
          description: 'When the error occurred',
        },
        requestId: {
          type: 'string',
          description: 'Request identifier for debugging',
        },
      },
      required: ['code', 'message'],
    },
  },
  required: ['error'],
};

export const ValidationErrorResponseSchema = {
  type: 'object',
  properties: {
    error: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
          enum: ['VALIDATION_ERROR'],
        },
        message: {
          type: 'string',
          example: 'Validation failed',
        },
        details: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              field: {
                type: 'string',
                description: 'Field that failed validation',
              },
              message: {
                type: 'string',
                description: 'Validation error message',
              },
              code: {
                type: 'string',
                description: 'Validation error code',
              },
            },
            required: ['field', 'message'],
          },
        },
        timestamp: {
          type: 'string',
          format: 'date-time',
        },
        requestId: {
          type: 'string',
        },
      },
      required: ['code', 'message', 'details'],
    },
  },
  required: ['error'],
};

/**
 * Creates a collection of common error response templates.
 *
 * @returns Object containing common error response templates
 *
 * @example
 * ```typescript
 * const errorTemplates = createCommonErrorTemplates();
 * const responses = mergeResponses(
 *   createSuccessResponse('Success'),
 *   errorTemplates.badRequest,
 *   errorTemplates.unauthorized
 * );
 * ```
 */
export function createCommonErrorTemplates() {
  return {
    badRequest: createErrorResponseTemplate(
      HttpStatusCodes.BAD_REQUEST,
      'Bad Request - Invalid input data',
      'BAD_REQUEST',
    ),
    unauthorized: createErrorResponseTemplate(
      HttpStatusCodes.UNAUTHORIZED,
      'Unauthorized - Authentication required',
      'UNAUTHORIZED',
    ),
    forbidden: createErrorResponseTemplate(HttpStatusCodes.FORBIDDEN, 'Forbidden - Access denied', 'FORBIDDEN'),
    notFound: createErrorResponseTemplate(HttpStatusCodes.NOT_FOUND, 'Not Found - Resource not found', 'NOT_FOUND'),
    conflict: createErrorResponseTemplate(HttpStatusCodes.CONFLICT, 'Conflict - Resource already exists', 'CONFLICT'),
    validationError: createErrorResponseTemplate(
      HttpStatusCodes.UNPROCESSABLE_ENTITY,
      'Unprocessable Entity - Validation failed',
      'VALIDATION_ERROR',
      true,
    ),
    tooManyRequests: createErrorResponseTemplate(
      HttpStatusCodes.TOO_MANY_REQUESTS,
      'Too Many Requests - Rate limit exceeded',
      'RATE_LIMIT_EXCEEDED',
    ),
    internalServerError: createErrorResponseTemplate(
      HttpStatusCodes.INTERNAL_SERVER,
      'Internal Server Error',
      'INTERNAL_SERVER_ERROR',
    ),
    serviceUnavailable: createErrorResponseTemplate(
      HttpStatusCodes.SERVICE_UNAVAILABLE,
      'Service Unavailable - Server temporarily unavailable',
      'SERVICE_UNAVAILABLE',
    ),
  };
}

/**
 * Creates a standardized error response template.
 *
 * @param statusCode - HTTP status code
 * @param description - Error description
 * @param errorCode - Specific error code
 * @param useValidationSchema - Whether to use validation error schema (for 422 errors)
 * @returns A SwaggerResponse object with standardized error format
 *
 * @example
 * ```typescript
 * const response = createErrorResponseTemplate(400, 'Bad Request', 'INVALID_INPUT');
 * ```
 */
export function createErrorResponseTemplate(
  statusCode: number,
  description: string,
  errorCode?: string,
  useValidationSchema = false,
): SwaggerResponse {
  const schema = useValidationSchema ? ValidationErrorResponseSchema : ErrorResponseSchema;

  return {
    [statusCode]: {
      description,
      content: {
        'application/json': {
          schema,
          example: useValidationSchema
            ? {
                error: {
                  code: 'VALIDATION_ERROR',
                  message: 'Validation failed',
                  details: [
                    {
                      field: 'email',
                      message: 'Invalid email format',
                      code: 'INVALID_FORMAT',
                    },
                  ],
                  timestamp: '2025-07-14T12:00:00Z',
                  requestId: 'req-123',
                },
              }
            : {
                error: {
                  code: errorCode || 'UNKNOWN_ERROR',
                  message: description,
                  timestamp: '2025-07-14T12:00:00Z',
                  requestId: 'req-123',
                },
              },
        },
      },
    },
  };
}
