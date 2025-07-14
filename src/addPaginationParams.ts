import type { SwaggerParameter } from './types';
import { addLimitParamToQuery } from './addLimitParamToQuery';
import { addOffsetParamToQuery } from './addOffsetParamToQuery';
import { addPageParamToQuery } from './addPageParamToQuery';
import { addSortParamToQuery } from './addSortParamToQuery';

export type PaginationStyle = 'page-limit' | 'offset-limit';

export type AddPaginationParamsProps = {
  style?: PaginationStyle;
  limitConfig?: {
    defaultValue?: number;
    minimum?: number;
    maximum?: number;
  };
  offsetConfig?: {
    defaultValue?: number;
    minimum?: number;
  };
  sortConfig?: {
    allowedFields?: string[];
    defaultValue?: string;
    allowDescending?: boolean;
  };
  includeSort?: boolean;
};

/**
 * Creates a standardized set of pagination parameters for OpenAPI specifications.
 *
 * @description This function generates common pagination parameters used in REST APIs.
 * It supports different pagination styles and can optionally include sorting parameters.
 *
 * @param props - Configuration object for pagination parameters
 * @param props.style - Pagination style: 'page-limit' or 'offset-limit' (defaults to 'page-limit')
 * @param props.limitConfig - Configuration for the limit parameter
 * @param props.offsetConfig - Configuration for the offset parameter (when using offset-limit style)
 * @param props.sortConfig - Configuration for the sort parameter (when includeSort is true)
 * @param props.includeSort - Whether to include sort parameter (defaults to false)
 *
 * @returns An array of SwaggerParameter objects representing pagination parameters
 *
 * @example
 * ```typescript
 * // Basic page-limit pagination
 * const paginationParams = addPaginationParams({});
 *
 * // Offset-limit pagination with sorting
 * const paginationParams = addPaginationParams({
 *   style: 'offset-limit',
 *   limitConfig: { defaultValue: 20, maximum: 100 },
 *   includeSort: true,
 *   sortConfig: {
 *     allowedFields: ['name', 'email', 'createdAt'],
 *     defaultValue: 'createdAt',
 *     allowDescending: true
 *   }
 * });
 *
 * // Use in createApiRoute parameters array
 * const route = createApiRoute({
 *   route: '/users',
 *   method: 'get',
 *   parameters: [
 *     ...addPaginationParams({
 *       style: 'page-limit',
 *       includeSort: true,
 *       sortConfig: { allowedFields: ['name', 'email'] }
 *     })
 *   ]
 * });
 * ```
 */
export function addPaginationParams(props: AddPaginationParamsProps = {}): SwaggerParameter[] {
  const { style = 'page-limit', limitConfig = {}, offsetConfig = {}, sortConfig = {}, includeSort = false } = props;

  const parameters: SwaggerParameter[] = [];

  // Add pagination parameters based on style
  if (style === 'page-limit') {
    parameters.push(addPageParamToQuery());
    parameters.push(addLimitParamToQuery(limitConfig));
  } else if (style === 'offset-limit') {
    parameters.push(addOffsetParamToQuery(offsetConfig));
    parameters.push(addLimitParamToQuery(limitConfig));
  }

  // Add sort parameter if requested
  if (includeSort) {
    parameters.push(addSortParamToQuery(sortConfig));
  }

  return parameters;
}
