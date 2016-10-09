var Idea = require('./idea.js');
var $ = require('jquery');

module.exports = function Runner() {
    this.ideasList = [];
    this.uncompletedIdeasList = [];
    this.idea = new Idea();

    Runner.prototype.generateNewIdea = function (titleInput, bodyInput) {
      var idea = new Idea({title: titleInput, body: bodyInput});
      this.ideasList.push(idea);
      this.storeIdea();
      idea.renderUncompletedIdeaToHTML(idea);
      this.clearFields();
    };
//
    Runner.prototype.storeIdea = function () {
        localStorage.setItem("ideasList", JSON.stringify(this.ideasList));
    };

    Runner.prototype.clearFields = function () {
        $('#title-input').val('');
        $('#body-input').val('');
        $('#search-bar').val('');
    };
//
//     Runner.prototype.findIdea = function (id) {
//         return this.ideasList.find(function(idea) {
//           return this.idea.id === parseInt(id);
//         });
//     };
//
//     Runner.prototype.deleteIdeaFromStorage = function (idea) {
//         this.ideasList = this.ideasList.filter(function(ideasToKeep) {
//           return ideasToKeep != idea;
//         });
//         localStorage.removeItem(idea);
//         this.updateIdeasList(this.ideasList);
//     };
//
//     Runner.prototype.updateIdeasList = function (ideasList) {
//         localStorage.setItem('ideasList', JSON.stringify(this.ideasList));
//         this.storeIdea();
//     };
//
//   Runner.prototype.updateBody = function (id, newBody) {
//       var idea = findIdea(id);
//       this.idea.body = newBody;
//       this.storeIdea();
//     };
//
//   Runner.prototype.updateTitle = function (id, newTitle) {
//     var foundIdea = findIdea(id);
//     this.foundIdea.title = newTitle;
//     this.storeIdea();
//   };
//
//   Runner.prototype.writeIdeas = function (ideasList) {
//     this.ideasList.forEach(function(idea) {
//       if (idea.completed === false) {
//       idea.renderUncompletedIdeaToHTML(idea);
//       }
//     });
//
//     Runner.prototype.numIdeas = function() {
//       var numIdeas = this.ideasList.length;
//       var begin = 0;
//
//       slicedIdeas = this. ideasList.slice(begin, end);
//       this.writeIdeas(slicedIdeas);
//     };
//
//   };
};
