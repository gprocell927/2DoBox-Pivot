const assert = require('assert')

describe('welcome page', function() {
  it('should be able to grab the page title', function(){
      browser.url('/');
      var title = browser.getTitle();
      assert.equal(title, 'ToDo Box');
  });
});

describe('attributes on our application', function (){
  it('has input forms and I can set values in those forms', function() {
    browser.url('/');
    var todoTitle = browser.element("#title-input");
    var todoDescription = browser.element("#body-input");

    todoTitle.setValue('great title');
    todoDescription.setValue('great description');

    assert.equal(todoTitle.getValue(), 'great title');
    assert.equal(todoDescription.getValue(), 'great description');
  });

  it('should be able to add my todos to the page', function(){
    browser.url('/');
    var todoTitle = browser.element("#title-input");
    var todoDescription = browser.element("#body-input");

    todoTitle.setValue('great title');
    todoDescription.setValue('great description');

    assert.equal(todoTitle.getValue(), 'great title');
    assert.equal(todoDescription.getValue(), 'great description');

    browser.click('#save-button');

    var allTodos = browser.getText('li');
    assert.equal(allTodos.replace(/\n/g, ", "), 'great title, great description');
  });
});
