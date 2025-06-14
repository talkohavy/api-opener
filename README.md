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
      objectName: 'user',
      operationName: 'retrieve',
      isPositiveNumber: true
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
  baseUrl: string;
  routes: Array<SwaggerRoute>;
  extendedTags?: Array<SwaggerTag>;
  definitions?: any;
  responses?: any;
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
  objectName: string;        // e.g., 'user', 'product'
  operationName: string;     // e.g., 'retrieve', 'update', 'delete'
  isPositiveNumber?: boolean; // Use integer type instead of string
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
      objectName: 'user',
      operationName: 'retrieve',
      isPositiveNumber: true
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
      objectName: 'user',
      operationName: 'update',
      isPositiveNumber: true
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
      objectName: 'user',
      operationName: 'delete',
      isPositiveNumber: true
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

### Using Schema References

```typescript
const createProductRoute = createApiRoute({
  route: '/products',
  method: 'post',
  tag: 'Products',
  summary: 'Create product',
  requestBody: addRequestBody({
    description: 'Product data',
    isRequired: true,
    refString: '#/components/schemas/Product'  // Reference external schema
  })
});

const apiSpec = createSwaggerApiDocs({
  title: 'E-commerce API',
  baseUrl: 'https://api.shop.com',
  routes: [createProductRoute],
  definitions: {
    Product: {
      type: 'object',
      required: ['name', 'price'],
      properties: {
        name: { type: 'string' },
        price: { type: 'number', minimum: 0 },
        category: { type: 'string' }
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
