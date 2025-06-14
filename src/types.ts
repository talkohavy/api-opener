import type { SwaggerResponse } from './common/constants';

type SwaggerStringFormat = {
  type?: 'string';
  format?: 'date' | 'date-time' | 'password' | 'byte' | 'binary';
  minLength?: number;
  maxLength?: number;
};

type SwaggerNumberFormat = {
  type?: 'number';
  format?: 'float' | 'double';
};

type SwaggerIntegerFormat = {
  type?: 'integer';
  format?: 'int32' | 'int64';
  /**
   * Use the minimum and maximum keywords to specify the range of possible values.
   * By default, the minimum and maximum values are included in the range.
   */
  minimum?: number;
  /**
   * Use the minimum and maximum keywords to specify the range of possible values.
   * By default, the minimum and maximum values are included in the range.
   */
  maximum?: number;
};

type SwaggerBooleanFormat = {
  type?: 'boolean';
  format?: undefined;
};

type SwaggerObjectFormat = {
  type?: 'object';
  format?: undefined;
  required?: Array<string>;
  properties: Record<string, SwaggerProperty>;
};

type SwaggerArrayFormat = {
  type?: 'array';
  items: SwaggerSchema;
  uniqueItems?: boolean;
  format?: undefined;
};

export type SwaggerResponseContent = {
  description: string;
  content?: {
    'application/x-www-form-urlencoded': any;
    'application/json': any;
  };
};

export type RestMethodNames = 'get' | 'post' | 'put' | 'patch' | 'delete';

export type SwaggerParameter = {
  in: 'query' | 'path' | 'body' | 'header';
  name: string;
  required?: boolean;
  description?: string;
  allowEmptyValue?: boolean;
  schema?: SwaggerSchema;
};

export type SwaggerProperty = {
  description?: string;
  example?: any;
} & SwaggerSchema;

export type SwaggerRequestBody = {
  description?: string;
  required?: boolean;
  content: {
    'application/json'?: { schema: SwaggerSchema };
    'application/x-www-form-urlencoded'?: { schema: SwaggerSchema };
  };
};

export type SwaggerRoute = Record<
  string,
  {
    get?: SwaggerRouteMethod;
    post?: SwaggerRouteMethod;
    patch?: SwaggerRouteMethod;
    put?: SwaggerRouteMethod;
    delete?: SwaggerRouteMethod;
  }
>;

export type SwaggerRouteMethod = {
  tags: Array<SwaggerTag>;
  summary?: string;
  description?: string;
  operationId?: string;
  parameters?: Array<SwaggerParameter>;
  requestBody?: SwaggerRequestBody;
  responses?: SwaggerResponse;
  security?: any;
};

export type SwaggerSchema =
  | { $ref: string }
  | ({ default?: string | number; enum?: Array<string | number> } & (
      | SwaggerStringFormat
      | SwaggerBooleanFormat
      | SwaggerObjectFormat
      | SwaggerNumberFormat
      | SwaggerIntegerFormat
      | SwaggerArrayFormat
    ));

export type SwaggerTag =
  | string
  | {
      name: string;
      description?: string;
      externalDocs?: {
        url: string;
        description?: string;
      };
    };
