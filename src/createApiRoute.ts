import type { RestMethodNames, SwaggerRoute, SwaggerRouteMethod, SwaggerTag } from './types.js';

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
  const { route, method, tag, summary, description, operationId, parameters, requestBody, responses, security } = props;

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
  if (responses) {
    routeProps.responses = responses;
  }

  // routeProps.consumes = ['application/json']; // <--- this belongs to OpenAPI 2.0! It was replaced by `requestBody.content` map which maps the media types to their schemas!
  // routeProps.produces = ['application/json', 'application/xml'];

  // Step 8: attach security
  if (security) {
    routeProps.security = security;
  }

  // Step 9: create swagger api route
  const swaggerRoute = { [route]: { [method]: routeProps } };

  return swaggerRoute;
}
