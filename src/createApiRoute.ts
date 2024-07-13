import { addResponseStatus } from './addResponseStatus.js';
import {
  ResponseStatusCodes,
  type RestMethodNames,
  type SwaggerRoute,
  type SwaggerRouteMethod,
  type SwaggerTag,
} from './types.js';

type CreateApiRouteProps = {
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

function createApiRoute(props: CreateApiRouteProps): SwaggerRoute {
  const {
    route,
    method,
    tag,
    summary,
    description,
    operationId,
    parameters,
    requestBody,
    // eslint-disable-next-line
    responses,
    security,
  } = props;

  const routeProps: SwaggerRouteMethod = {} as any;

  // Step 1: Attach group name
  routeProps.tags = [tag ?? 'Rest'];

  // Step 2: attach route summary
  summary && (routeProps.summary = summary);

  // Step 3: attach route description
  description && (routeProps.description = description);

  // Step 4: attach operationId for e2e or crawlers
  operationId && (routeProps.operationId = operationId);

  // Step 5: attach queryParams
  parameters && (routeProps.parameters = parameters);

  // Step 6: attach body
  requestBody && (routeProps.requestBody = requestBody);

  // Step 7: attach responses
  routeProps.responses = {
    ...addResponseStatus({
      statusCode: ResponseStatusCodes.OK,
      description: 'A successful request.',
      // schema: responses?.[200]?.schema,
    }),
    ...addResponseStatus({
      statusCode: ResponseStatusCodes.CREATED,
      description: 'Resource was created successfully.',
      // schema: responses?.[201]?.schema,
    }),
    ...addResponseStatus({
      statusCode: ResponseStatusCodes.BAD_REQUEST,
      description: 'Validation error...',
      // schema: responses?.[400]?.schema,
    }),
    ...addResponseStatus({
      statusCode: ResponseStatusCodes.NOT_FOUND,
      description: 'Resource not found.',
      // schema: responses?.[404]?.schema,
    }),
    ...addResponseStatus({
      statusCode: ResponseStatusCodes.INTERNAL_SERVER_ERROR,
      description: 'Internal server error.',
      // schema: responses?.[500]?.schema,
    }),
    ...addResponseStatus({
      statusCode: ResponseStatusCodes.DEFAULT,
      description: 'Unexpected error',
      schema: { type: 'object', properties: { error: { type: 'string', example: 'oops...' } } },
    }),
  };

  // routeProps.consumes = ['application/json']; // <--- this belongs to OpenAPI 2.0! It was replaced by `requestBody.content` map which maps the media types to their schemas!
  // routeProps.produces = ['application/json', 'application/xml'];

  // Step 9: attach security
  security && (routeProps.security = security);

  // Step 10: create swagger api route
  const swaggerRoute = { [route]: { [method]: routeProps } };

  return swaggerRoute;
}

export { createApiRoute };
