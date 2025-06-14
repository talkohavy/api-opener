import type { SwaggerParameter } from './types';

export type AddIdParamToPathProps = {
  objectName: string;
  operationName: string;
  isPositiveNumber?: boolean;
};

export function addIdParamToPath(props: AddIdParamToPathProps): SwaggerParameter {
  const { objectName, operationName, isPositiveNumber = false } = props;

  return {
    name: 'id',
    in: 'path',
    description: `ID of ${objectName} to ${operationName}`,
    required: true,
    schema: isPositiveNumber ? { type: 'integer', format: 'int32', minimum: 0 } : { type: 'string' },
  };
}
