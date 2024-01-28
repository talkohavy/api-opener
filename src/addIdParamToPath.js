/**
 * @typedef {import('../types').SwaggerParameter} SwaggerParameter
 * @typedef {import('../types').AddIdParamToPathProps} AddIdParamToPathProps
 */

/**
 * @param {AddIdParamToPathProps} props
 * @returns {SwaggerParameter}
 */
function addIdParamToPath({ objectName, operationName, isPositiveNumber = false }) {
  return {
    name: 'id',
    in: 'path',
    description: `ID of ${objectName} to ${operationName}`,
    required: true,
    schema: isPositiveNumber ? { type: 'integer', format: 'int32', minimum: 0 } : { type: 'string' },
  };
}

export { addIdParamToPath };
