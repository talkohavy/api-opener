import type { SwaggerProperty, SwaggerRequestBody, SwaggerSchema } from './types';

export type AddRequestBodyProps = {
  description?: string;
  isRequired?: boolean;
  requiredFields?: Array<string>;
  /**
   * When using `properties`, you shouldn't pass `refString`.
   */
  properties?: Record<string, SwaggerProperty>;
  /**
   * When using `refString`, you shouldn't pass `properties`.
   */
  refString?: string;
};

/**
 * @description
 * IMPORTANT NOTE!!!
 * As of 27/01/2024, there is no validation on the body's properties,
 * not in `application/json` and not in `application/x-www-form-urlencoded`.
 * The only check swagger enforces is the `isRequired` for the entire body
 * when it's `application/json`, and the requiredFields when it's
 * `application/x-www-form-urlencoded` which checks the existence of each field.
 */
export function addRequestBody(props: AddRequestBodyProps): SwaggerRequestBody {
  const { description, isRequired, requiredFields, properties, refString } = props;

  const schema: SwaggerSchema = properties
    ? { type: 'object', required: requiredFields, properties }
    : { $ref: refString! };

  return {
    description,
    content: {
      'application/x-www-form-urlencoded': { schema },
      'application/json': { schema },
    },
    required: isRequired,
  };
}
