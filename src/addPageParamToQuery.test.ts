import assert from 'node:assert';
import { describe, it } from 'node:test';
import { addPageParamToQuery } from './addPageParamToQuery';

describe('addPageParamToQuery', () => {
  it('should create a page parameter with correct structure', () => {
    const expectedResult = {
      name: 'page',
      in: 'query',
      description: 'Num of page',
      required: false,
      schema: { type: 'integer', minimum: 1 },
    };

    const actualResult = addPageParamToQuery();

    assert.deepEqual(actualResult, expectedResult);
  });

  it('should always return parameter named page', () => {
    const actualResult = addPageParamToQuery();
    assert.strictEqual(actualResult.name, 'page');
  });

  it('should always return parameter in query', () => {
    const actualResult = addPageParamToQuery();
    assert.strictEqual(actualResult.in, 'query');
  });

  it('should always return optional parameter', () => {
    const actualResult = addPageParamToQuery();
    assert.strictEqual(actualResult.required, false);
  });

  it('should always return integer schema with minimum 1', () => {
    const actualResult = addPageParamToQuery();
    assert.deepEqual(actualResult.schema, { type: 'integer', minimum: 1 });
  });

  it('should have consistent description', () => {
    const actualResult = addPageParamToQuery();
    assert.strictEqual(actualResult.description, 'Num of page');
  });
});
