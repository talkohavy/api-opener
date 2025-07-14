import type { HttpStatusCodeValues, SwaggerResponse } from './common/constants';

export type AddResponseStatusProps = {
  statusCode: HttpStatusCodeValues;
  description: string;
  schema?: any;
};

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
