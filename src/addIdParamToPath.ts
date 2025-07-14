import type { SwaggerParameter, SwaggerSchema } from './types';

export type AddIdParamToPathProps = {
  description?: string;
  schema?: SwaggerSchema;
};

export function addIdParamToPath(props: AddIdParamToPathProps): SwaggerParameter {
  const { description, schema } = props;

  return {
    name: 'id',
    in: 'path',
    description: description || 'ID of the resource',
    required: true,
    schema: schema ?? { type: 'string' },
  };
}
