const assert = require('chai').assert;
const Runner = require('../lib/runner.js');

describe('Runner', function() {

  it('should have an array that stores ideas', function(){
    var runner = new Runner();
    assert.isArray(runner.ideasList);
  });

  it('should create an Idea when "generateNewIdea()" is called', function(){
    var runner = new Runner();

    runner.generateNewIdea();

    assert.equal(runner.ideasList.length, 1);
    assert.isObject(runner.ideasList[0]);
  });

});
