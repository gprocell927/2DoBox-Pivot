var $ = require ('jquery');
var Runner = require ('./runner.js');

function Idea(options){
  options = options || {};
  this.title = options.title;
  this.body = options.body;
  this.id = options.id || Date.now();
  this.quality = options.quality || 'Normal';
  this.completed = options.completed || false;
}

Idea.prototype.markAsComplete = function () {
  this.completed = true;
};

Idea.prototype.renderUncompletedIdeaToHTML = function (idea) {
  $('.idea-list').prepend(
    `<li id=${idea.id} class="list-li uncompleted" data-completed=false >
    <h3 contenteditable="true" class="idea-titleuncompleted">${idea.title}</h3>
    <button aria-label="delete idea" class="delete-idea"></button>
    <p contenteditable="true" class="body-input"> ${idea.body}</p>
    <section class="uncompleted">
    <button class="completed-todo btn-body">Complete?</button>
    </section>
    <section class="vote">
    <button aria-label="upvote" class="upvote"></button>
    <article role="button" aria-label="downvote" class="downvote"></article>
    <p class="quality-control">quality: ${idea.quality}</p>
    </section>
    </li>`);
  };

Idea.prototype.renderCompletedIdeaToHTML = function (idea) {
  $('.idea-list').prepend(
    `<li id=${idea.id} class="list-li completed" data-completed=true >
    <h3 contenteditable="true" class="idea-title completed">${idea.title}</h3>
    <button aria-label="delete idea" class="delete-idea"></button>
    <p contenteditable="true" class="body-input"> ${idea.body}</p>
    <section class="completed">
    <button class="completed-todo btn-body">COMPLETE?</button>
    </section>
    <section class="vote">
    <button  aria-label="upvote" class="upvote"></button>
    <article role="button" aria-label="downvote" class="downvote"></article>
    <p class="quality-control">quality: ${idea.quality}</p>
    </section>
    </li>`);
  };

  Idea.prototype.criticalIdeas = function (idea){
      return (idea.quality === 'Critical');
  };

  Idea.prototype.highIdeas = function (idea){
      return (idea.quality === 'High');
  };

  Idea.prototype.normalIdeas = function (idea){
      return (idea.quality === 'Normal');
  };

  Idea.prototype.lowIdeas = function (idea){
      return (idea.quality === 'Low');
  };

  Idea.prototype.noneIdeas = function (idea){
      return (idea.quality === 'None');
  };


  Idea.prototype.completedIdeas = function (idea) {
    return idea.completed === true;
  };

  Idea.prototype.uncompletedIdeas = function (idea) {
      return idea.completed === false;
  };

module.exports = Idea;
