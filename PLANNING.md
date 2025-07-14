# 🎯 API Opener - Project Planning

## 📋 Project Overview

**API Opener** is a TypeScript library designed to programmatically generate OpenAPI 3.1.0 specifications for REST APIs. It provides a set of utility functions to create Swagger documentation with type safety and minimal boilerplate.

## 🏗️ Architecture & Design

### Current Architecture

- **Core Functions**: `createSwaggerApiDocs`, `createApiRoute`
- **Helper Functions**: `addIdParamToPath`, `addPageParamToQuery`, `addRequestBody`, `addResponseStatus`
- **Type System**: Comprehensive TypeScript definitions in `types.ts`
- **Constants**: HTTP status codes and response type definitions

### Target Architecture

- **Modular Design**: Each function should be self-contained and testable
- **Type Safety**: Full TypeScript coverage with proper generics
- **Extensibility**: Easy to add new parameter types and response formats
- **Standards Compliance**: Full OpenAPI 3.1.0 specification compliance

## 🎯 Scope & Goals

### Primary Goals

1. **Standards Compliance**: Ensure full OpenAPI 3.1.0 specification compliance
2. **Type Safety**: Provide comprehensive TypeScript support
3. **Developer Experience**: Intuitive API with great defaults
4. **Extensibility**: Easy to extend with new features
5. **Test Coverage**: Comprehensive unit testing

### Secondary Goals

1. **Performance**: Optimize for large API specifications
2. **Documentation**: Clear examples and API reference
3. **Validation**: Input validation and error handling
4. **Backwards Compatibility**: Maintain API stability

## 🛠️ Technology Stack

### Core Technologies

- **TypeScript**: Primary language for type safety
- **OpenAPI 3.1.0**: Target specification standard
- **ESM/CJS**: Dual package support
- **Node.js**: Runtime environment

### Development Tools

- **Biome**: Code formatting and linting
- **ESLint**: Additional linting rules
- **Rollup**: Build and bundling
- **Node.js Test Runner**: Native testing solution

### Dependencies

- **@talkohavy/lodash**: Utility functions (deepMerge)
- **Zero runtime dependencies goal**: Minimize external dependencies

## 🔍 Current Issues Identified

### 1. **API Inconsistencies**

- README shows `objectName` and `operationName` parameters in `addIdParamToPath` but implementation only has `description` and `schema`
- Multiple API signature mismatches between documentation and implementation

### 2. **OpenAPI Compliance Issues**

- Mixing OpenAPI 2.0 and 3.1.0 properties (`host`, `basePath`, `schemes` are 2.0)
- `securityDefinitions` should be `components.securitySchemes` in 3.1.0
- Hardcoded LuckyLove-specific content in `createSwaggerDocs`

### 3. **Code Quality Issues**

- No unit tests despite instructions requiring them
- Some functions use `any` types reducing type safety
- Inconsistent error handling and validation
- Mixed content types handling could be improved

### 4. **Structure Issues**

- Constants file has type issues with `SwaggerResponse`
- Missing comprehensive examples
- No input validation in most functions

### 5. **Package Issues**

- Package marked as `"private": "true"` but should be public
- Missing important HTTP status codes
- File extensions inconsistency (`.js` imports in `.ts` files)

## 🎨 Code Style & Standards

### TypeScript Standards

- Prefer `function` declarations over arrow functions
- Use proper type definitions (avoid `any`)
- Implement comprehensive error handling
- Follow OpenAPI 3.1.0 specification exactly

### Code Organization

- Keep files under 500 lines
- Group related functionality
- Use relative imports
- Maintain consistent naming conventions

### Testing Strategy

- Unit tests for all functions
- Integration tests for complex scenarios
- Type testing for TypeScript definitions
- Example-based testing for documentation

## 🚀 Migration Strategy

### Phase 1: Foundation (Immediate)

- Fix API inconsistencies
- Add comprehensive unit tests
- Improve OpenAPI 3.1.0 compliance
- Remove hardcoded content

### Phase 2: Enhancement (Short-term)

- Add input validation
- Improve error handling
- Add more HTTP status codes
- Enhance type safety

### Phase 3: Advanced Features (Long-term)

- Add validation for OpenAPI specs
- Support for OpenAPI 3.1.0 advanced features
- Performance optimizations
- Enhanced documentation

## 📊 Success Metrics

### Code Quality

- **Test Coverage**: 90%+ unit test coverage
- **Type Safety**: Zero `any` types in public API
- **Linting**: Zero ESLint/Biome violations
- **Documentation**: All public APIs documented

### Standards Compliance

- **OpenAPI**: Full 3.1.0 specification compliance
- **TypeScript**: Strict mode compatibility
- **Package**: ESM/CJS dual support working
- **API**: Consistent with documentation

### Developer Experience

- **Easy Setup**: Simple installation and usage
- **Clear Examples**: Working examples for all features
- **Type Support**: Full IntelliSense support
- **Error Messages**: Helpful error messages

## 🔄 Versioning Strategy

- Follow semantic versioning (semver)
- Major versions for breaking changes
- Minor versions for new features
- Patch versions for bug fixes
- Maintain changelog for all releases

## 🎯 Future Considerations

### Potential Features

- JSON Schema validation
- OpenAPI spec validation
- Visual schema builder
- CLI tool for generating specs
- Plugin system for extensions

### Performance Optimizations

- Lazy loading of large schemas
- Caching for repeated operations
- Bundle size optimization
- Memory usage optimization

---

_Last updated: July 14, 2025_
