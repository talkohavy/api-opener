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

type SwaggerRouteMethod = {
  tags: Array<SwaggerTag>;
  summary?: string;
  description?: string;
  operationId?: string;
  parameters?: Array<SwaggerParameter>;
  requestBody?: SwaggerRequestBody;
  responses?: SwaggerResponse;
  security?: any;
};

export type AddIdParamToPathProps = {
  objectName: string;
  operationName: string;
  isPositiveNumber?: boolean;
};

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

export type AddResponseStatusProps = {
  statusCode: number | string;
  description: string;
  schema?: any;
};

export type CreateApiRouteProps = {
  /**
   * Rules:
   * - Must start with a slash '/'.
   * - If it's a dynamic route, use '/some-route/{id}'. (id is the assumed name of the parameter)
   * - You should not add 'http://localhost:port' or some other domain as a prefix. Swagger will add the baseUrl you provided as a prefix.
   */
  route: string;
  method: RestMethodNames;
  tag?: SwaggerTag;
} & Omit<SwaggerRouteMethod, 'tags'>;

export type CreateSwaggerApiDocsProps = {
  title?: string;
  baseUrl: string;
  routes: Array<SwaggerRoute>;
  extendedTags?: Array<SwaggerTag>;
  definitions?: any;
  responses?: any;
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

export type SwaggerResponse = Record<
  number | 'default',
  {
    description: string;
    content?: {
      'application/x-www-form-urlencoded': any;
      'application/json': any;
    };
  }
>;

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

export function addIdParamToPath(props: AddIdParamToPathProps): SwaggerParameter;
export function addPageParamToQuery(): SwaggerParameter;
export function addRequestBody(props: AddRequestBodyProps): SwaggerRequestBody;
export function addResponseStatus(props: AddResponseStatusProps): SwaggerResponse;
export function createApiRoute(props: CreateApiRouteProps): SwaggerRoute;
export function createSwaggerApiDocs(props: CreateSwaggerApiDocsProps): any;
