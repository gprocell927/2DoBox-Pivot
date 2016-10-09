const assert = require('chai').assert;
const Runner = require('../lib/runner.js');
var $ = require('jquery');

describe('Runner', function() {

  it('should be a function', function(){
    assert.isFunction(Runner);
  });

  it('should have an array that stores all ideas', function(){
    var runner = new Runner();
    assert.isArray(runner.ideasList);
  });

  it('should have an array that stores uncompleted ideas', function(){
    var runner = new Runner();
    assert.isArray(runner.uncompletedIdeasList);
  });

  it('should instantiate a new Idea', function(){
    var runner = new Runner();
    assert.isObject(runner.idea);
  });

  it('should push a new Idea into ideasList when "generateNewIdea()" is called', function(){
    var runner = new Runner();

    runner.generateNewIdea();

    assert.equal(runner.ideasList.length, 1);
    assert.isObject(runner.ideasList[0]);
  });

  it.skip('should store an idea', function(){

  });

  it.skip('should clear text input fields when an idea is saved', function(){
    var runner = new Runner();
    var titleText = $('#title-input').val();
    var bodyText = $('#body-input').val();
    var searchText = $('#search-bar').val();

    runner.clearFields();

    assert.equal(titleText, '');
    assert.equal(bodyText, '');
    assert.equal(searchText, '');
  });

  it.skip('should return a matching idea when findIdea() is called', function() {
    var runner = new Runner();

    runner.generateNewIdea({id: 123});
    runner.generateNewIdea({id: 456});
    runner.findIdea(456);

    assert.equal(idea.id, 456);
  });

  it.skip('should delete an idea from ideasList when "deleteIdeaFromStorage()" is called', function(){
    var runner = new Runner();

    runner.generateNewIdea();
    runner.generateNewIdea();
    runner.deleteIdeaFromStorage();

    assert.equal(runner.ideasList.length, 1);
  });

});
