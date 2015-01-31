assert = require("assert")

describe 'a suite of tests', () ->
  this.timeout(500)

  it 'should take less than 500ms', (done) ->
    setTimeout(done, 300)

  it 'should take less than 500ms as well', (done) ->
    setTimeout(done, 200)

describe 'Array', () ->
  describe '#indexOf()', () ->
    it 'should return -1 when the value is not present', () ->
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
