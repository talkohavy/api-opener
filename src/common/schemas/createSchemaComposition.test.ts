import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  createAllOfSchema,
  createOneOfSchema,
  createAnyOfSchema,
  createNotSchema,
  createConditionalSchema,
  createDiscriminatorSchema,
  CommonSchemaCompositions,
} from './createSchemaComposition';

describe('Schema Composition', () => {
  describe('createAllOfSchema', () => {
    it('should create allOf schema with multiple schemas', () => {
      const schema1 = { type: 'object', properties: { name: { type: 'string' } } } as any;
      const schema2 = { type: 'object', properties: { age: { type: 'integer' } } } as any;

      const expectedResult = {
        allOf: [schema1, schema2],
        description: 'Combined schema',
      };
      const actualResult = createAllOfSchema([schema1, schema2], 'Combined schema');

      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe('createOneOfSchema', () => {
    it('should create oneOf schema with multiple schemas', () => {
      const schema1 = { type: 'string' } as any;
      const schema2 = { type: 'number' } as any;

      const expectedResult = {
        oneOf: [schema1, schema2],
        description: 'String or number',
      };
      const actualResult = createOneOfSchema([schema1, schema2], 'String or number');

      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe('createAnyOfSchema', () => {
    it('should create anyOf schema with multiple schemas', () => {
      const schema1 = { type: 'string' } as any;
      const schema2 = { type: 'number' } as any;

      const expectedResult = {
        anyOf: [schema1, schema2],
        description: 'String and/or number',
      };
      const actualResult = createAnyOfSchema([schema1, schema2], 'String and/or number');

      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe('createNotSchema', () => {
    it('should create not schema', () => {
      const schema = { type: 'string', maxLength: 0 } as any;

      const expectedResult = {
        not: schema,
        description: 'Not empty string',
      };
      const actualResult = createNotSchema(schema, 'Not empty string');

      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe('createConditionalSchema', () => {
    it('should create conditional schema with if/then/else', () => {
      const ifSchema = { properties: { type: { const: 'admin' } } } as any;
      const thenSchema = { properties: { permissions: { type: 'array' } } } as any;
      const elseSchema = { properties: { role: { type: 'string' } } } as any;

      const expectedResult = {
        if: ifSchema,
        then: thenSchema,
        else: elseSchema,
        description: 'Conditional schema',
      };
      const actualResult = createConditionalSchema(ifSchema, thenSchema, elseSchema, 'Conditional schema');

      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe('createDiscriminatorSchema', () => {
    it('should create discriminator schema', () => {
      const mapping = {
        dog: '#/components/schemas/Dog',
        cat: '#/components/schemas/Cat',
      };

      const expectedResult = {
        discriminator: {
          propertyName: 'type',
          mapping,
        },
        description: 'Animal discriminator',
      };
      const actualResult = createDiscriminatorSchema('type', mapping, 'Animal discriminator');

      assert.deepStrictEqual(actualResult, expectedResult);
    });
  });

  describe('CommonSchemaCompositions', () => {
    describe('nullable', () => {
      it('should create nullable schema', () => {
        const schema = { type: 'string' } as any;

        const expectedResult = {
          oneOf: [schema, { type: 'null' }],
          description: 'Nullable value',
        };
        const actualResult = CommonSchemaCompositions.nullable(schema);

        assert.deepStrictEqual(actualResult, expectedResult);
      });

      it('should create nullable schema with custom description', () => {
        const schema = { type: 'string' } as any;

        const expectedResult = {
          oneOf: [schema, { type: 'null' }],
          description: 'Nullable string',
        };
        const actualResult = CommonSchemaCompositions.nullable(schema, 'Nullable string');

        assert.deepStrictEqual(actualResult, expectedResult);
      });
    });

    describe('paginated', () => {
      it('should create paginated response schema', () => {
        const itemSchema = { type: 'string' } as any;

        const expectedResult = {
          type: 'object',
          properties: {
            data: { type: 'array', items: itemSchema },
            meta: {
              type: 'object',
              properties: {
                page: { type: 'integer', minimum: 1 },
                limit: { type: 'integer', minimum: 1 },
                total: { type: 'integer', minimum: 0 },
                totalPages: { type: 'integer', minimum: 0 },
              },
              required: ['page', 'limit', 'total'],
            },
          },
          required: ['data', 'meta'],
          description: 'Paginated response',
        };
        const actualResult = CommonSchemaCompositions.paginated(itemSchema);

        assert.deepStrictEqual(actualResult, expectedResult);
      });
    });

    describe('apiResponse', () => {
      it('should create API response wrapper schema', () => {
        const dataSchema = { type: 'string' } as any;

        const expectedResult = {
          type: 'object',
          properties: {
            success: { type: 'boolean', description: 'Whether request was successful' },
            data: dataSchema,
            message: { type: 'string', description: 'Response message' },
            timestamp: { type: 'string', format: 'date-time', description: 'Response timestamp' },
          },
          required: ['success', 'data'],
          description: 'API response wrapper',
        };
        const actualResult = CommonSchemaCompositions.apiResponse(dataSchema);

        assert.deepStrictEqual(actualResult, expectedResult);
      });
    });

    describe('timestamped', () => {
      it('should create timestamped entity schema', () => {
        const baseSchema = { type: 'object', properties: { name: { type: 'string' } } } as any;

        const expectedResult = {
          allOf: [
            baseSchema,
            {
              type: 'object',
              properties: {
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
              },
              required: ['createdAt', 'updatedAt'],
            },
          ],
          description: 'Timestamped entity',
        };
        const actualResult = CommonSchemaCompositions.timestamped(baseSchema);

        assert.deepStrictEqual(actualResult, expectedResult);
      });
    });
  });
});
