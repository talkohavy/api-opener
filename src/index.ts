import { createSwaggerApiDocs, type CreateSwaggerApiDocsProps } from './createSwaggerDocs.js';

export { addIdParamToPath, type AddIdParamToPathProps } from './addIdParamToPath.js';
export { addPageParamToQuery } from './addPageParamToQuery.js';
export { addRequestBody, type AddRequestBodyProps } from './addRequestBody.js';
export { addResponseStatus, type AddResponseStatusProps } from './addResponseStatus.js';
export { createApiRoute, type CreateApiRouteProps } from './createApiRoute.js';
export { createSwaggerApiDocs, type CreateSwaggerApiDocsProps };
export { HttpStatusCodes } from './common/constants.js';

export type * from './types.js';

export default createSwaggerApiDocs;
