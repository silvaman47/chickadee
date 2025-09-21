const assert = require('assert');
const { describe, it } = require('mocha');

describe('Basic Test', () => {
  it('should pass', () => {
    assert.strictEqual(1, 1);
  });
});