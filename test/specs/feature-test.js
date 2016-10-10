const assert = require('assert')

describe('welcome page', function() {
  it('should be able to grab the page title', function(){
      browser.url('/');
      var title = browser.getTitle();
      assert.equal(title, 'ToDo Box');
  });
});

describe('input form', function (){
  it('has input forms and I can set values in those forms', function() {
    browser.url('/');
    var todoTitle = browser.element("#title-input");
    var todoDescription = browser.element("#body-input");

    todoTitle.setValue('great title');
    todoDescription.setValue('great description');

    assert.equal(todoTitle.getValue(), 'great title');
    assert.equal(todoDescription.getValue(), 'great description');
  });

});

describe('appending tasks', function (){

  it('should be able to add my todos to the page', function(){
    browser.url('/');
    var todoTitle = browser.element('.idea-titleuncompleted');
    var todoDescription = browser.element('.body-input');

    todoTitle.setValue('great title');
    todoDescription.setValue('great description');

    browser.click('#btn-save');

    assert.equal(todoTitle.getValue(), 'great title');
    assert.equal(todoDescription.getValue(), 'great description');

});

describe('voting attributes', function (){

  it.skip('should have a button that changes a toDos importance to critical', function() {
    browser.url('/');
    browser.localStorage('DELETE');
    browser.refresh();
    var todoTitle = browser.element('#title-input');
    var todoDescription = browser.element('#body-input');

    todoTitle.setValue('great title');
    todoDescription.setValue('great description');
    browser.click('#btn-save');

    var upvoteTodo = browser.element('.quality-control');

    browser.click('.upvote');
    browser.click('.upvote');

    assert.equal(upvoteTodo, 'quality: Critical');
  });
});
});
