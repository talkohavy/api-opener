# 🚀 API Opener

[![npm version](https://badge.fury.io/js/api-opener.svg)](https://badge.fury.io/js/api-opener)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Design your API easily with Swagger OpenAPI specification** ✨

A lightweight, fully-typed TypeScript library for programmatically creating OpenAPI 3.1.0 specifications. Build comprehensive API documentation with type safety and minimal boilerplate.

## 📋 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [API Reference](#-api-reference)
- [Examples](#-examples)
- [TypeScript Support](#-typescript-support)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- 🔥 **Full TypeScript Support** - Complete type safety and IntelliSense
- 📝 **OpenAPI 3.1.0 Compatible** - Latest OpenAPI specification
- 🛠️ **Modular Design** - Use only what you need
- 🎯 **Zero Dependencies** - Lightweight and fast
- 📦 **ESM & CJS Support** - Works in any environment
- 🔧 **Developer Friendly** - Intuitive API with great defaults

## 📦 Installation

```bash
npm install api-opener
```

```bash
yarn add api-opener
```

```bash
pnpm add api-opener
```

## 🚀 Quick Start

```typescript
import { createSwaggerApiDocs, createApiRoute, addRequestBody, addIdParamToPath } from 'api-opener';

// Create API routes
const getUserRoute = createApiRoute({
  route: '/users/{id}',
  method: 'get',
  tag: 'Users',
  summary: 'Get user by ID',
  description: 'Retrieve a single user by their unique identifier',
  parameters: [
    addIdParamToPath({
      description: 'Unique identifier for the user',
      schema: { type: 'string', pattern: '^[0-9]+$' }
    })
  ]
});

const createUserRoute = createApiRoute({
  route: '/users',
  method: 'post',
  tag: 'Users',
  summary: 'Create a new user',
  description: 'Create a new user account',
  requestBody: addRequestBody({
    description: 'User data',
    isRequired: true,
    requiredFields: ['email', 'name'],
    properties: {
      name: {
        type: 'string',
        description: 'Full name of the user',
        example: 'John Doe'
      },
      email: {
        type: 'string',
        format: 'email',
        description: 'User email address',
        example: 'john@example.com'
      },
      age: {
        type: 'integer',
        minimum: 0,
        maximum: 120,
        description: 'User age',
        example: 30
      }
    }
  })
});

// Generate complete OpenAPI specification
const apiDocs = createSwaggerApiDocs({
  title: 'My Awesome API',
  baseUrl: 'https://api.example.com',
  routes: [getUserRoute, createUserRoute],
  extendedTags: [
    {
      name: 'Users',
      description: 'User management operations',
      externalDocs: {
        description: 'Learn more about users',
        url: 'https://docs.example.com/users'
      }
    }
  ]
});

console.log(JSON.stringify(apiDocs, null, 2));
```

## 📚 API Reference

### Core Functions

#### `createSwaggerApiDocs(props)`

Creates a complete OpenAPI 3.1.0 specification document.

```typescript
type CreateSwaggerApiDocsProps = {
  title?: string;
  description?: string;
  version?: string;
  baseUrl: string;
  routes: Array<SwaggerRoute>;
  extendedTags?: Array<SwaggerTag>;
  definitions?: any;
  responses?: any;
  contact?: {
    name?: string;
    url?: string;
    email?: string;
  };
  license?: {
    name?: string;
    url?: string;
  };
  termsOfService?: string;
};
```

#### `createApiRoute(props)`

Creates a single API route with all HTTP method details.

```typescript
type CreateApiRouteProps = {
  route: string;           // Must start with '/', use '{id}' for dynamic segments
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  tag?: SwaggerTag;
  summary?: string;
  description?: string;
  operationId?: string;
  parameters?: Array<SwaggerParameter>;
  requestBody?: SwaggerRequestBody;
  security?: any;
};
```

### Helper Functions

#### `addIdParamToPath(props)`

Creates a standardized ID parameter for path routes.

```typescript
type AddIdParamToPathProps = {
  description?: string;    // Optional description (defaults to "ID of the resource")
  schema?: SwaggerSchema;  // Optional schema definition (defaults to string type)
};
```

#### `addPageParamToQuery()`

Adds pagination parameter to query string.

```typescript
// Returns a 'page' query parameter with integer type and minimum value of 1
const pageParam = addPageParamToQuery();
```

#### `addRequestBody(props)`

Creates a request body specification with validation.

```typescript
type AddRequestBodyProps = {
  description?: string;
  isRequired?: boolean;
  requiredFields?: Array<string>;
  properties?: Record<string, SwaggerProperty>;  // Use this OR refString
  refString?: string;                           // Reference to schema definition
};
```

#### `addResponseStatus(props)`

Creates response specifications for different HTTP status codes.

```typescript
type AddResponseStatusProps = {
  statusCode: HttpStatusCodeValues;
  description: string;
  schema?: any;
};
```

#### `HttpStatusCodes`

Pre-defined HTTP status codes for use in responses.

```typescript
export const HttpStatusCodes = {
  // 2xx Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // 4xx Client Error
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,

  // 5xx Server Error
  INTERNAL_SERVER: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,

  // Default
  DEFAULT: 'default',
} as const;
```

### Response Helper Functions

#### `createSuccessResponse(description, schema?)`

Creates a standardized 200 OK response.

```typescript
const response = createSuccessResponse('User retrieved successfully', {
  $ref: '#/components/schemas/User'
});
```

#### `createCreatedResponse(description, schema?)`

Creates a standardized 201 Created response.

```typescript
const response = createCreatedResponse('User created successfully', {
  $ref: '#/components/schemas/User'
});
```

#### `createBadRequestResponse(description?, schema?)`

Creates a standardized 400 Bad Request response.

```typescript
const response = createBadRequestResponse('Invalid user data provided');
```

#### `createUnauthorizedResponse(description?, schema?)`

Creates a standardized 401 Unauthorized response.

```typescript
const response = createUnauthorizedResponse('Authentication required');
```

#### `createNotFoundResponse(description?, schema?)`

Creates a standardized 404 Not Found response.

```typescript
const response = createNotFoundResponse('User not found');
```

#### `createInternalServerErrorResponse(description?, schema?)`

Creates a standardized 500 Internal Server Error response.

```typescript
const response = createInternalServerErrorResponse('Database connection failed');
```

#### `mergeResponses(...responses)`

Merges multiple response objects into a single responses object.

```typescript
const responses = mergeResponses(
  createSuccessResponse('User found', { $ref: '#/components/schemas/User' }),
  createNotFoundResponse('User not found'),
  createInternalServerErrorResponse()
);
```

## 💡 Examples

### Basic CRUD API

```typescript
import {
  createSwaggerApiDocs,
  createApiRoute,
  addRequestBody,
  addIdParamToPath,
  addPageParamToQuery
} from 'api-opener';

// List users with pagination
const listUsersRoute = createApiRoute({
  route: '/users',
  method: 'get',
  tag: 'Users',
  summary: 'List all users',
  parameters: [addPageParamToQuery()]
});

// Get single user
const getUserRoute = createApiRoute({
  route: '/users/{id}',
  method: 'get',
  tag: 'Users',
  summary: 'Get user by ID',
  parameters: [
    addIdParamToPath({
      description: 'Unique identifier for the user',
      schema: { type: 'integer', minimum: 1 }
    })
  ]
});

// Create user
const createUserRoute = createApiRoute({
  route: '/users',
  method: 'post',
  tag: 'Users',
  summary: 'Create user',
  requestBody: addRequestBody({
    description: 'User creation data',
    isRequired: true,
    requiredFields: ['email', 'name'],
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 100 },
      email: { type: 'string', format: 'email' },
      role: {
        type: 'string',
        enum: ['admin', 'user', 'moderator'],
        default: 'user'
      }
    }
  })
});

// Update user
const updateUserRoute = createApiRoute({
  route: '/users/{id}',
  method: 'put',
  tag: 'Users',
  summary: 'Update user',
  parameters: [
    addIdParamToPath({
      description: 'Unique identifier for the user to update',
      schema: { type: 'integer', minimum: 1 }
    })
  ],
  requestBody: addRequestBody({
    description: 'Updated user data',
    isRequired: true,
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 100 },
      email: { type: 'string', format: 'email' }
    }
  })
});

// Delete user
const deleteUserRoute = createApiRoute({
  route: '/users/{id}',
  method: 'delete',
  tag: 'Users',
  summary: 'Delete user',
  parameters: [
    addIdParamToPath({
      description: 'Unique identifier for the user to delete',
      schema: { type: 'integer', minimum: 1 }
    })
  ]
});

// Generate complete API docs
const apiSpec = createSwaggerApiDocs({
  title: 'User Management API',
  baseUrl: 'https://api.myapp.com/v1',
  routes: [
    listUsersRoute,
    getUserRoute,
    createUserRoute,
    updateUserRoute,
    deleteUserRoute
  ]
});
```

### Using Response Helper Functions

```typescript
import {
  createSwaggerApiDocs,
  createApiRoute,
  addRequestBody,
  addIdParamToPath,
  createSuccessResponse,
  createCreatedResponse,
  createBadRequestResponse,
  createNotFoundResponse,
  createUnauthorizedResponse,
  mergeResponses,
  HttpStatusCodes
} from 'api-opener';

// Create user route with comprehensive responses
const createUserRoute = createApiRoute({
  route: '/users',
  method: 'post',
  tag: 'Users',
  summary: 'Create a new user',
  requestBody: addRequestBody({
    description: 'User creation data',
    isRequired: true,
    requiredFields: ['email', 'name'],
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 100 },
      email: { type: 'string', format: 'email' },
      role: { type: 'string', enum: ['admin', 'user'], default: 'user' }
    }
  }),
  responses: mergeResponses(
    createCreatedResponse('User created successfully', {
      $ref: '#/components/schemas/User'
    }),
    createBadRequestResponse('Invalid user data provided', {
      $ref: '#/components/schemas/ValidationError'
    }),
    createUnauthorizedResponse('Authentication required')
  )
});

// Get user route with error handling
const getUserRoute = createApiRoute({
  route: '/users/{id}',
  method: 'get',
  tag: 'Users',
  summary: 'Get user by ID',
  parameters: [
    addIdParamToPath({
      description: 'Unique identifier for the user',
      schema: { type: 'integer', minimum: 1 }
    })
  ],
  responses: mergeResponses(
    createSuccessResponse('User retrieved successfully', {
      $ref: '#/components/schemas/User'
    }),
    createNotFoundResponse('User not found'),
    createBadRequestResponse('Invalid user ID format')
  )
});

const apiSpec = createSwaggerApiDocs({
  title: 'User Management API',
  description: 'Complete API for user management with proper error handling',
  version: '1.0.0',
  baseUrl: 'https://api.myapp.com/v1',
  routes: [createUserRoute, getUserRoute],
  contact: {
    name: 'API Team',
    email: 'api@myapp.com'
  },
  definitions: {
    User: {
      type: 'object',
      required: ['id', 'name', 'email'],
      properties: {
        id: { type: 'integer', readOnly: true },
        name: { type: 'string', minLength: 1, maxLength: 100 },
        email: { type: 'string', format: 'email' },
        role: { type: 'string', enum: ['admin', 'user'] },
        createdAt: { type: 'string', format: 'date-time', readOnly: true }
      }
    },
    ValidationError: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        field: { type: 'string' },
        code: { type: 'string' }
      }
    }
  }
});
```

### Advanced Schema Composition

```typescript
import {
  createSwaggerApiDocs,
  createApiRoute,
  addRequestBody,
  addResponseStatus,
  HttpStatusCodes
} from 'api-opener';

const createProductRoute = createApiRoute({
  route: '/products',
  method: 'post',
  tag: 'Products',
  summary: 'Create product',
  requestBody: addRequestBody({
    description: 'Product data',
    isRequired: true,
    refString: '#/components/schemas/Product'  // Reference external schema
  }),
  responses: {
    [HttpStatusCodes.CREATED]: {
      description: 'Product created successfully',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/Product' }
        }
      }
    },
    [HttpStatusCodes.BAD_REQUEST]: {
      description: 'Invalid product data'
    }
  }
});

const apiSpec = createSwaggerApiDocs({
  title: 'E-commerce API',
  description: 'API for managing products and orders',
  version: '1.0.0',
  baseUrl: 'https://api.shop.com',
  routes: [createProductRoute],
  contact: {
    name: 'API Support',
    email: 'support@shop.com'
  },
  definitions: {
    Product: {
      type: 'object',
      required: ['name', 'price'],
      properties: {
        id: { type: 'integer', readOnly: true },
        name: { type: 'string', minLength: 1, maxLength: 100 },
        price: { type: 'number', minimum: 0 },
        category: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time', readOnly: true }
      }
    }
  }
});
```

## 🔧 TypeScript Support

This library is written in TypeScript and provides complete type definitions. All functions return properly typed objects that match the OpenAPI 3.1.0 specification.

```typescript
import type {
  SwaggerRoute,
  SwaggerParameter,
  SwaggerRequestBody,
  SwaggerSchema,
  CreateApiRouteProps
} from 'api-opener';

// Full type safety and IntelliSense support
const route: SwaggerRoute = createApiRoute({
  route: '/api/test',
  method: 'post',
  // TypeScript will enforce correct property types
});
```

## 🛠️ Troubleshooting

### Common Issues

#### Import/Export Errors

If you encounter import errors, ensure you're using the correct import syntax:

```typescript
// ✅ Correct - Named imports
import { createSwaggerApiDocs, createApiRoute } from 'api-opener';

// ✅ Correct - Default import
import createSwaggerApiDocs from 'api-opener';

// ❌ Incorrect - Mixed syntax
import createSwaggerApiDocs, { createApiRoute } from 'api-opener';
```

#### Route Format Errors

Routes must follow specific patterns:

```typescript
// ✅ Correct route formats
'/users'
'/users/{id}'
'/api/v1/users/{userId}/posts/{postId}'

// ❌ Incorrect route formats
'users'           // Missing leading slash
'/users/<id>'     // Use {id} instead of <id>
'/users/:id'      // Use {id} instead of :id
```

#### Schema Reference Errors

When using schema references, ensure proper format:

```typescript
// ✅ Correct reference formats
'#/components/schemas/User'
'#/definitions/User'

// ❌ Incorrect reference formats
'User'                    // Missing reference prefix
'#/schemas/User'          // Wrong path
'components/schemas/User' // Missing hash
```

#### TypeScript Errors

If you encounter TypeScript errors, ensure:

1. You're using TypeScript 4.0 or higher
2. You have proper type imports
3. Your tsconfig.json includes the necessary lib files

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020"],
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true
  }
}
```

### Performance Tips

1. **Reuse Helper Functions**: Create helper functions for common patterns
2. **Use Schema References**: Reference schemas instead of inline definitions for better performance
3. **Batch Route Creation**: Create multiple routes at once instead of individual calls

```typescript
// ✅ Efficient approach
const userRoutes = [
  createApiRoute(getUserConfig),
  createApiRoute(createUserConfig),
  createApiRoute(updateUserConfig)
];

// ❌ Less efficient
const getUserRoute = createApiRoute(getUserConfig);
const createUserRoute = createApiRoute(createUserConfig);
const updateUserRoute = createApiRoute(updateUserConfig);
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Tal Kohavy**

- GitHub: [@talkohavy](https://github.com/talkohavy)
- Email: talkohavy@gmail.com

---

⭐ If you found this package helpful, please consider giving it a star on GitHub!
