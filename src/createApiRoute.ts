import type { RestMethodNames, SwaggerRoute, SwaggerRouteMethod, SwaggerTag } from './types.js';
import { addResponseStatus } from './addResponseStatus.js';
import { HttpStatusCodes } from './common/constants.js';

export type CreateApiRouteProps = {
  /**
   * Rules:
   * - Must start with a slash '/'.
   * - If it's a dynamic route, use '/some-route/{id}'. (id is the assumed name of the parameter)
   * - You should not add 'http://localhost:port' or some other domain as a prefix. Swagger will add the baseUrl you provided as a prefix.
   */
  route: string;
  method: RestMethodNames;
  tag?: SwaggerTag;
} & Omit<SwaggerRouteMethod, 'tags'>;

export function createApiRoute(props: CreateApiRouteProps): SwaggerRoute {
  const { route, method, tag, summary, description, operationId, parameters, requestBody, security } = props;

  const routeProps: SwaggerRouteMethod = {} as any;

  // Step 1: Attach group name
  routeProps.tags = [tag ?? 'Rest'];

  // Step 2: attach route summary
  if (summary) {
    routeProps.summary = summary;
  }

  // Step 3: attach route description
  if (description) {
    routeProps.description = description;
  }

  // Step 4: attach operationId for e2e or crawlers
  if (operationId) {
    routeProps.operationId = operationId;
  }

  // Step 5: attach queryParams
  if (parameters) {
    routeProps.parameters = parameters;
  }

  // Step 6: attach body
  if (requestBody) {
    routeProps.requestBody = requestBody;
  }

  // Step 7: attach responses
  routeProps.responses = {
    ...addResponseStatus({
      statusCode: HttpStatusCodes.OK,
      description: 'A successful request.',
      // schema: responses?.[200]?.schema,
    }),
    ...addResponseStatus({
      statusCode: HttpStatusCodes.CREATED,
      description: 'Resource was created successfully.',
      // schema: responses?.[201]?.schema,
    }),
    ...addResponseStatus({
      statusCode: HttpStatusCodes.BAD_REQUEST,
      description: 'Validation error...',
      // schema: responses?.[400]?.schema,
    }),
    ...addResponseStatus({
      statusCode: HttpStatusCodes.NOT_FOUND,
      description: 'Resource not found.',
      // schema: responses?.[404]?.schema,
    }),
    ...addResponseStatus({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      description: 'Internal server error.',
      // schema: responses?.[500]?.schema,
    }),
    ...addResponseStatus({
      statusCode: HttpStatusCodes.DEFAULT,
      description: 'Unexpected error',
      schema: { type: 'object', properties: { error: { type: 'string', example: 'oops...' } } },
    }),
  };

  // routeProps.consumes = ['application/json']; // <--- this belongs to OpenAPI 2.0! It was replaced by `requestBody.content` map which maps the media types to their schemas!
  // routeProps.produces = ['application/json', 'application/xml'];

  // Step 9: attach security
  if (security) {
    routeProps.security = security;
  }

  // Step 10: create swagger api route
  const swaggerRoute = { [route]: { [method]: routeProps } };

  return swaggerRoute;
}
