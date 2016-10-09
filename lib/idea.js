var $ = require ('jquery');

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
    <button class="delete-idea"></button>
    <p contenteditable="true" class="body-input"> ${idea.body}</p>
    <section class="uncompleted">
    <button class="completed-todo">COMPLETE</button>
    </section>
    <section class="vote">
    <button class="upvote"></button>
    <article class="downvote"></article>
    <p class="quality-control">quality: ${idea.quality}</p>
    </section>
    </li>`);
  };

Idea.prototype.renderCompletedIdeaToHTML = function (idea) {
  $('.idea-list').prepend(
    `<li id=${idea.id} class="list-li completed" data-completed=true >
    <h3 contenteditable="true" class="idea-title completed">${idea.title}</h3>
    <button class="delete-idea"></button>
    <p contenteditable="true" class="body-input"> ${idea.body}</p>
    <section class="completed">
    <button class="completed-todo">COMPLETE</button>
    </section>
    <section class="vote">
    <button class="upvote"></button>
    <article class="downvote"></article>
    <p class="quality-control">quality: ${idea.quality}</p>
    </section>
    </li>`);
  };

  Idea.prototype.criticalIdeas = function (){
      return idea.quality === 'Critical';
  };

  Idea.prototype.completedIdeas = function () {
    return this.completed === true;
  };

  Idea.prototype.uncompletedIdeas = function () {
      return this.completed === false;
  };

module.exports = Idea;
