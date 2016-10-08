const assert = require('chai').assert;
const Runner = require('../lib/runner.js');
const Idea = require('../lib/idea.js');

describe('Runner', function() {
  context('it should have an array that stores ideas', function(){
    var runner = new Runner();
    assert.isArray(runner.ideasList, true);
  });
});
