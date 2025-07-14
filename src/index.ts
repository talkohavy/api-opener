import { createSwaggerApiDocs, type CreateSwaggerApiDocsProps } from './createSwaggerDocs';

export { addIdParamToPath, type AddIdParamToPathProps } from './addIdParamToPath';
export { addPageParamToQuery } from './addPageParamToQuery';
export { addRequestBody, type AddRequestBodyProps } from './addRequestBody';
export { addResponseStatus, type AddResponseStatusProps } from './addResponseStatus';
export { createApiRoute, type CreateApiRouteProps } from './createApiRoute';
export { createSwaggerApiDocs, type CreateSwaggerApiDocsProps };
export {
  createSuccessResponse,
  createCreatedResponse,
  createBadRequestResponse,
  createUnauthorizedResponse,
  createNotFoundResponse,
  createInternalServerErrorResponse,
  mergeResponses,
} from './common/utils';
export { HttpStatusCodes } from './common/constants';

export type * from './types';

export default createSwaggerApiDocs;
