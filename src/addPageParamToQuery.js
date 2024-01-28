/**
 * @typedef {import('../types').SwaggerParameter} SwaggerParameter
 */

/** @returns {SwaggerParameter} */
function addPageParamToQuery() {
  return {
    name: 'page',
    in: 'query',
    description: 'Num of page',
    required: false,
    schema: { type: 'integer', minimum: 1 },
  };
}

export { addPageParamToQuery };
