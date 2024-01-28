import { addResponseStatus } from './addResponseStatus.js';

/**
 * @typedef {import('../types').SwaggerRoute} SwaggerRoute
 * @typedef {import('../types').CreateApiRouteProps} CreateApiRouteProps
 * @typedef {import('../types').RestMethodNames} RestMethodNames
 */

/**
 * @param {CreateApiRouteProps} props
 * @returns {SwaggerRoute}
 */
function createApiRoute({
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
}) {
  const routeProps = {};

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
      statusCode: 200,
      description: 'A successful request.',
      // schema: responses?.[200]?.schema,
    }),
    ...addResponseStatus({
      statusCode: 201,
      description: 'Resource was created successfully.',
      // schema: responses?.[201]?.schema,
    }),
    ...addResponseStatus({
      statusCode: 400,
      description: 'Validation error...',
      // schema: responses?.[400]?.schema,
    }),
    ...addResponseStatus({
      statusCode: 404,
      description: 'Resource not found.',
      // schema: responses?.[404]?.schema,
    }),
    ...addResponseStatus({
      statusCode: 500,
      description: 'Internal server error.',
      // schema: responses?.[500]?.schema,
    }),
    ...addResponseStatus({
      statusCode: 'default',
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
