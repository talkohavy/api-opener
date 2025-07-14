import type { HttpStatusCodeValues, SwaggerResponse } from './common/constants';

export type AddResponseStatusProps = {
  statusCode: HttpStatusCodeValues;
  description: string;
  schema?: any;
};

/**
 * Creates a response status definition for OpenAPI specifications.
 *
 * @description This function generates a response object for a specific HTTP status code
 * with a description and optional schema. It supports both standard HTTP status codes
 * and the special 'default' status code for catch-all responses.
 *
 * @param props - Configuration object for the response status
 * @param props.statusCode - HTTP status code (100-599) or 'default'
 * @param props.description - Description of the response (required)
 * @param props.schema - Optional schema definition for the response body
 *
 * @returns A SwaggerResponse object with the specified status code and configuration
 *
 * @throws {ResponseStatusValidationError} When statusCode is invalid or description is empty
 *
 * @example
 * ```typescript
 * // Basic success response
 * const successResponse = addResponseStatus({
 *   statusCode: 200,
 *   description: 'User retrieved successfully'
 * });
 *
 * // Response with schema
 * const userResponse = addResponseStatus({
 *   statusCode: 201,
 *   description: 'User created successfully',
 *   schema: { $ref: '#/components/schemas/User' }
 * });
 *
 * // Default error response
 * const errorResponse = addResponseStatus({
 *   statusCode: 'default',
 *   description: 'Unexpected error occurred'
 * });
 * ```
 */
export function addResponseStatus(props: AddResponseStatusProps): SwaggerResponse {
  const { statusCode, description, schema } = props;

  validateStatusCode(statusCode);
  validateDescription(description);

  const responseStatus: SwaggerResponse = { [statusCode]: { description } };

  if (schema) {
    const status = responseStatus[statusCode];
    if (status) {
      status.content = {
        'application/x-www-form-urlencoded': { schema },
        'application/json': { schema },
      };
    }
  }

  return responseStatus;
}

function validateDescription(description: string): void {
  if (!description || description.trim() === '') {
    throw new ResponseStatusValidationError('Description cannot be empty', 'description');
  }
}

function validateStatusCode(statusCode: HttpStatusCodeValues): void {
  if (statusCode == null) {
    throw new ResponseStatusValidationError('Status code cannot be undefined or null', 'statusCode');
  }

  if (statusCode !== 'default' && typeof statusCode === 'number') {
    if (statusCode < 100 || statusCode >= 600) {
      throw new ResponseStatusValidationError(
        `Invalid HTTP status code ${statusCode}. Must be between 100-599 or 'default'`,
        'statusCode',
      );
    }
  }
}

class ResponseStatusValidationError extends Error {
  constructor(
    message: string,
    public field: string,
  ) {
    super(message);
    this.name = 'ResponseStatusValidationError';
  }
}
