/**
 * @typedef {import('../types').SwaggerResponse} SwaggerResponse
 */

/**
 * @param {{ statusCode: number | string, description: string, schema?: any }} props
 * @returns {SwaggerResponse}
 */
function addResponseStatus({ statusCode, description, schema }) {
  const responseStatus = { [statusCode]: { description } };

  if (schema) {
    responseStatus[statusCode].content = {
      'application/x-www-form-urlencoded': { schema },
      'application/json': { schema },
    };
  }

  return responseStatus;
}

export { addResponseStatus };
