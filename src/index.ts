import { createSwaggerApiDocs, type CreateSwaggerApiDocsProps } from './createSwaggerDocs';

export { addIdParamToPath, type AddIdParamToPathProps } from './addIdParamToPath';
export { addPageParamToQuery } from './addPageParamToQuery';
export { addLimitParamToQuery, type AddLimitParamToQueryProps } from './addLimitParamToQuery';
export { addOffsetParamToQuery, type AddOffsetParamToQueryProps } from './addOffsetParamToQuery';
export { addSortParamToQuery, type AddSortParamToQueryProps } from './addSortParamToQuery';
export { addFilterParamToQuery, type AddFilterParamToQueryProps } from './addFilterParamToQuery';
export {
  addHeaderParam,
  addAuthorizationHeader,
  addApiKeyHeader,
  addContentTypeHeader,
  type AddHeaderParamProps,
} from './addHeaderParam';
export { addPaginationParams, type AddPaginationParamsProps } from './addPaginationParams';
export { addRequestBody, type AddRequestBodyProps } from './addRequestBody';
export { addResponseStatus, type AddResponseStatusProps } from './addResponseStatus';
export { createApiRoute, type CreateApiRouteProps } from './createApiRoute';
export { createSwaggerApiDocs, type CreateSwaggerApiDocsProps };
export * from './common/utils';
export * from './common/schemas/createStringSchema';
export * from './common/schemas/createNumberSchema';
export * from './common/schemas/createArraySchema';
export * from './common/schemas/createObjectSchema';
export * from './common/schemas/createSchemaComposition';
export * from './common/schemas/createSchemaReference';
export * from './common/schemas/createValidationSchemas';
export { HttpStatusCodes } from './common/constants';

export type { ResponseConfig } from './common/utils/createResponse';
export type * from './types';

export default createSwaggerApiDocs;
