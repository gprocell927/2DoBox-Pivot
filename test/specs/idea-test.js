
// const Idea = require('../lib/idea.js');
// const Idea = require('../../lib/scripts.js');
const Idea = require('../../lib/idea.js');
const assert = require('chai').assert;

describe('There is a constructor for Idea', function() {

  it('Should be a function call Idea', function(){
    assert.isFunction(Idea);
  });
});
