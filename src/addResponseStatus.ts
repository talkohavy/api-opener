import type { ResponseStatusCodes, SwaggerResponse } from './types';

type AddResponseStatusProps = {
  statusCode: ResponseStatusCodes;
  description: string;
  schema?: any;
};

function addResponseStatus(props: AddResponseStatusProps): SwaggerResponse {
  const { statusCode, description, schema } = props;

  const responseStatus: SwaggerResponse = { [statusCode]: { description } };

  if (schema) {
    responseStatus[statusCode]!.content = {
      'application/x-www-form-urlencoded': { schema },
      'application/json': { schema },
    };
  }

  return responseStatus;
}

export { addResponseStatus };
