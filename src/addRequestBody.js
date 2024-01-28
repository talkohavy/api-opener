/**
 * @typedef {import('../types').AddRequestBodyProps} AddRequestBodyProps
 * @typedef {import('../types').SwaggerRequestBody} SwaggerRequestBody
 * @typedef {import('../types').SwaggerSchema} SwaggerSchema
 */

/**
 * @description
 * IMPORTANT NOTE!!!
 * As of 27/01/2024, there is no validation on the body's properties,
 * not in `application/json` and not in `application/x-www-form-urlencoded`.
 * The only check swagger enforces is the `isRequired` for the entire body
 * when it's `application/json`, and the requiredFields when it's
 * `application/x-www-form-urlencoded` which checks the existence of each field.
 * @param {AddRequestBodyProps} props
 * @returns {SwaggerRequestBody}
 */
function addRequestBody({ description, isRequired, requiredFields, properties, refString }) {
  /** @type {SwaggerSchema} */
  const schema = properties ? { type: 'object', required: requiredFields, properties } : { $ref: refString };

  return {
    description,
    content: {
      'application/x-www-form-urlencoded': { schema },
      'application/json': { schema },
    },
    required: isRequired,
  };
}

export { addRequestBody };
