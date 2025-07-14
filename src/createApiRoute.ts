import type { RestMethodNames, SwaggerRoute, SwaggerRouteMethod, SwaggerTag } from './types';

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

/**
 * Creates an API route definition for OpenAPI specifications.
 *
 * @description This function generates a complete OpenAPI route definition with all the
 * necessary properties including path, method, parameters, request body, responses, and
 * security requirements. It validates the route format and HTTP method to ensure compliance
 * with OpenAPI standards.
 *
 * @param props - Configuration object for the API route
 * @param props.route - URL path for the route (must start with '/'), supports path parameters with {param} syntax
 * @param props.method - HTTP method (get, post, put, patch, delete)
 * @param props.tag - Optional tag for grouping routes (defaults to 'Rest')
 * @param props.summary - Optional short summary of the route
 * @param props.description - Optional detailed description of the route
 * @param props.operationId - Optional unique identifier for the operation
 * @param props.parameters - Optional array of parameters (query, path, header)
 * @param props.requestBody - Optional request body definition
 * @param props.responses - Optional response definitions
 * @param props.security - Optional security requirements
 *
 * @returns A SwaggerRoute object representing the complete API route
 *
 * @throws {ApiRouteValidationError} When route format or method is invalid
 *
 * @example
 * ```typescript
 * // Basic route
 * const getUserRoute = createApiRoute({
 *   route: '/users/{id}',
 *   method: 'get',
 *   summary: 'Get user by ID',
 *   parameters: [addIdParamToPath({ description: 'User ID' })],
 *   responses: {
 *     200: { description: 'User found', schema: { $ref: '#/components/schemas/User' } }
 *   }
 * });
 *
 * // Complete route with all properties
 * const createUserRoute = createApiRoute({
 *   route: '/users',
 *   method: 'post',
 *   tag: 'Users',
 *   summary: 'Create a new user',
 *   description: 'Creates a new user account with the provided information',
 *   operationId: 'createUser',
 *   requestBody: addRequestBody({
 *     description: 'User data',
 *     isRequired: true,
 *     refString: '#/components/schemas/CreateUserRequest'
 *   }),
 *   responses: {
 *     201: { description: 'User created successfully' },
 *     400: { description: 'Invalid input data' }
 *   },
 *   security: [{ bearerAuth: [] }]
 * });
 * ```
 */
export function createApiRoute(props: CreateApiRouteProps): SwaggerRoute {
  const { route, method, tag, summary, description, operationId, parameters, requestBody, responses, security } = props;

  validateRoute(route);
  validateMethod(method);

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

function validateRoute(route: string): void {
  if (!route) {
    throw new ApiRouteValidationError('Route cannot be empty', 'route');
  }

  if (!route.startsWith('/')) {
    throw new ApiRouteValidationError('Route must start with a forward slash "/"', 'route');
  }

  // Check for invalid characters
  const invalidChars = /[<>]/;
  if (invalidChars.test(route)) {
    throw new ApiRouteValidationError(
      'Route contains invalid characters. Use {paramName} for path parameters',
      'route',
    );
  }

  // Check for proper path parameter format
  const pathParamRegex = /\{([^}]*)\}/g;
  let match: RegExpExecArray | null;
  while ((match = pathParamRegex.exec(route)) !== null) {
    const paramName = match[1];
    if (!paramName || paramName.trim() === '') {
      throw new ApiRouteValidationError('Path parameter name cannot be empty', 'route');
    }

    // Check for valid parameter name (alphanumeric, underscore, hyphen)
    if (!/^[a-zA-Z0-9_-]+$/.test(paramName)) {
      throw new ApiRouteValidationError(
        `Invalid path parameter name "${paramName}". Use only alphanumeric characters, underscores, and hyphens`,
        'route',
      );
    }
  }
}

function validateMethod(method: RestMethodNames): void {
  const validMethods: RestMethodNames[] = ['get', 'post', 'put', 'patch', 'delete'];
  if (!validMethods.includes(method)) {
    throw new ApiRouteValidationError(
      `Invalid HTTP method "${method}". Must be one of: ${validMethods.join(', ')}`,
      'method',
    );
  }
}

class ApiRouteValidationError extends Error {
  constructor(
    message: string,
    public field: string,
  ) {
    super(message);
    this.name = 'ApiRouteValidationError';
  }
}
