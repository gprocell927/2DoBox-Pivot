const Idea = require('../lib/idea.js');
const assert = require('chai').assert;

describe ('Idea', function () {

  it('should be a function', function (){
    assert.isFunction(Idea);
  });

  it('should instantiate Idea', function () {
    var idea = new Idea();
    assert.isObject(idea);
  });

  it('should take the first argument and set it as the "title" of the instantiated object', function () {
    var idea = new Idea({title: 'new title'});
    assert.equal(idea.title, 'new title');
  });

  it('should take the second argument and set it as the id or the date by default ', function(){
    var idea = new Idea({title: 'new title', id: 12345});
    assert.equal(idea.id, 12345);
  });

  it('should take the third argument and set it as the body', function(){
    var idea = new Idea({title: 'new title', id: 12345, body: 'new body'});
    assert.equal(idea.body, 'new body');
  });

  it('should take the fourth argument and set it as the quality or "Normal" by default ', function(){
    var idea = new Idea({title: 'new title', id: 12345, body: 'new body', quality: 'Superb'});
    assert.equal(idea.quality, 'Superb');
  });

  it('should take the fifth argument and set the completed state to be "true" ', function(){
    var idea = new Idea({title: 'new title', id: 12345, body: 'new body', quality: 'Superb', completed: true});
    assert.equal(idea.completed, true);
  });

  it('should set completed to false by default ', function(){
    var idea = new Idea();
    assert.equal(idea.completed, false);
  });

  it('should set quality to "Normal" by default ', function(){
    var idea = new Idea();
    assert.equal(idea.quality, 'Normal');
  });

  it('should set id to the current timestamp by default ', function(){
    var idea = new Idea();
    assert.equal(idea.id, Date.now());
  });



});
