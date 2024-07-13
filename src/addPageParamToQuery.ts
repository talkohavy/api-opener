import type { SwaggerParameter } from './types';

function addPageParamToQuery(): SwaggerParameter {
  return {
    name: 'page',
    in: 'query',
    description: 'Num of page',
    required: false,
    schema: { type: 'integer', minimum: 1 },
  };
}

export { addPageParamToQuery };
