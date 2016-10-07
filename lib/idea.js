
function Idea(title, body, id, quality, completed) {
  this.id = id || Date.now() ;
  this.title = title;
  this.body = body;
  this.quality = quality || 'Normal';
  this.completed = false;
}

Idea.prototype = {

  generateNewIdea: function(titleInput, bodyInput) {
    var idea = new Idea(titleInput, bodyInput);
    ideasList.push(idea);
    storeIdea();
    renderUncompletedIdeaToHTML(idea);
    clearFields();
  },
  // storeIdea: function () {
  //     localStorage.setItem("ideasList", JSON.stringify(ideasList));
  // }
  renderUncompletedIdeaToHTML: function(idea) {

  $('.idea-list').prepend(
    `<li id=${idea.id} class="list-li">
    <h3 contenteditable="true" class="idea-title">${idea.title}</h3>
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
  }

};
module.exports = Idea;
