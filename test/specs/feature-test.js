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
    var todoTitle = browser.element("#input-title");
    var todoDescription = browser.element("#input-body");

    todoTitle.setValue('great title');
    todoDescription.setValue('great description');

    assert.equal(todoTitle.getValue(), 'great title');
    assert.equal(todoDescription.getValue(), 'great description');
  });

});

describe('appending tasks', function (){

  it('should be able to add my todos to the page', function(){
    browser.url('/');
    var todoTitle = browser.element("#input-title");
    var todoDescription = browser.element("#input-body");
    var todoAppendedTitle = browser.element('.idea-titleuncompleted');
    var todoAppendedDescription =
    browser.element('.body-input');

    todoTitle.setValue('great title');
    todoDescription.setValue('great description');

    browser.click('#btn-save');

    assert.equal(todoAppendedTitle.getText(), 'great title');
    assert.equal(todoAppendedDescription.getText(), 'great description');

});

describe('voting attributes', function (){

  it('should have a button that changes a toDos importance to critical', function() {
    browser.url('/');
    var todoTitle = browser.element("#input-title");
    var todoDescription = browser.element("#input-body");
    var todoAppendedTitle = browser.element('.idea-titleuncompleted');
    var todoAppendedDescription =
    browser.element('.body-input');
    var todoImportance = browser.element('.quality-control');

    todoTitle.setValue('great title');
    todoDescription.setValue('great description');

    browser.click('#btn-save');
    browser.click('.upvote');
    browser.click('.upvote');

    assert.equal(todoImportance.getText(), 'quality: Critical');
    });
  });

  describe('completed button', function (){
    it('will mark an idea as complete by striking through the text', function (){
      browser.url('/');
      var todoTitle = browser.element("#input-title");
      var todoDescription = browser.element("#input-body");
      var todoAppendedTitle = browser.element('.idea-titleuncompleted');
      var todoAppendedDescription =
      browser.element('.body-input');
      var todoTextDecoration = browser.element('.quality-control');

      todoTitle.setValue('great title');
      todoDescription.setValue('great description');

      browser.click('#btn-save');
      browser.click('.completed-todo');



    });

  });
});
