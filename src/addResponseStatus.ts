import type { HttpStatusCodeValues, SwaggerResponse } from './common/constants';

export type AddResponseStatusProps = {
  statusCode: HttpStatusCodeValues;
  description: string;
  schema?: any;
};

export function addResponseStatus(props: AddResponseStatusProps): SwaggerResponse {
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
