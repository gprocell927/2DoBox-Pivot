var Idea = require('./idea.js');
var $ = require('jquery');

module.exports = function Runner() {
    this.ideasList = [];

    Runner.prototype.generateNewIdea = function (titleInput, bodyInput) {
      var idea = new Idea(titleInput, bodyInput);
      this.ideasList.push(idea);
      this.storeIdea();
      idea.renderUncompletedIdeaToHTML(idea);
      this.clearFields();
    };

    Runner.prototype.storeIdea = function () {
        localStorage.setItem("ideasList", JSON.stringify(this.ideasList));
    };

    Runner.prototype.clearFields = function () {
        $('#title-input').val('');
        $('#body-input').val('');
        $('#search-bar').val('');
    };

};
