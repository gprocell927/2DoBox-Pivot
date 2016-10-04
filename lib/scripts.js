var ideasList = [];
var uncompletedIdeasList = [];
var $ = require('jQuery');

function Idea(title, body, id, quality, completed) {
  this.id = id || Date.now() ;
  this.title = title;
  this.body = body;
  this.quality = quality || 'swill';
  this.completed = false;
}

function clearFields() {
  $('#title-input').val('');
  $('#body-input').val('');
  $('#search-bar').val('');
}

function deleteIdeaFromStorage(idea) {
  ideasList = ideasList.filter(function(ideasToKeep) {
    return ideasToKeep != idea;
  });
  localStorage.removeItem(idea);
  updateIdeasList(ideasList);
}

function findIdea(id) {
  return ideasList.find(function(idea) {
    return idea.id === parseInt(id);
  });
}

function filterOutCompletedTasks (idea) {
  //take completed ideas out of ideasList
  uncompletedIdeasList = ideasList.filter(function(uncompletedIdeasList) {
    return uncompletedIdeasList != idea.completed;
  });

  //render uncompleted ideas to page
}

function generateNewIdea(titleInput, bodyInput) {
  var idea = new Idea(titleInput, bodyInput);
  ideasList.push(idea);
  storeIdea();
  renderIdeaToHTML(idea);
  clearFields();
}

function markAsComplete(idea){
  idea.completed = true;
}
function renderIdeaToHTML(idea) {
  strikeThroughText(idea);
  $('.idea-list').prepend(
    `<li id=${idea.id}>
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

function storeIdea() {
  localStorage.setItem("ideasList", JSON.stringify(ideasList));
}

function strikeThroughText(idea) {
  if (idea.completed === true){
    $('.idea-title').css("text-decoration", "line-through");
  }
}

function updateBody(id, newBody) {
  var idea = findIdea(id);
  idea.body = newBody;
  storeIdea();
}

function updateIdeasList(ideasList) {
  localStorage.setItem('ideasList', JSON.stringify(ideasList));
  storeIdea();
}

function updateTitle(id, newTitle) {
  var idea = findIdea(id);
  idea.title = newTitle;
  storeIdea();
}

function writeIdeas(ideasList) {
  ideasList.forEach(function(idea) {
    if (idea.completed === false) {
    renderIdeaToHTML(idea);
  }
});
}

$(document).ready(function() {
  ideasList = JSON.parse(localStorage.getItem('ideasList')) || [];
  //find ideas that are not completed
  writeIdeas(ideasList);
});

$('.idea-list').on('focusout', '.body-input', function(){
  var id = $(this).parent().attr('id');
  var newBody =  $(this).text();
  updateBody(id, newBody);
});

$('.idea-list').on('keypress', '.body-input', function(event) {
  var id = $(this).parent().attr('id');
  var newBody = $(this).text();
  if (event.which == 13) {
    event.preventDefault();
    $(this).blur();
  }
});

$('.idea-list').on('focusout', '.idea-title', function(){
  var id = $(this).parent().attr('id');
  var newTitle =  $(this).text();
  updateTitle(id, newTitle);
});

$('.idea-list').on('keypress', '.idea-title', function(event) {
  var id = $(this).parent().attr('id');
  var newTitle = $(this).text();
  if (event.which == 13) {
    event.preventDefault();
    $(this).blur();
  }
});

$('.idea-list').on('click', '.upvote', function() {
  var idea = findIdea($(this).parent().parent().attr('id'));
  var $quality = $(this).siblings('p');

  if ($quality.text() === 'quality: swill') {
     $quality.text('quality: plausible');
     idea.quality = 'plausible';
  } else if ($quality.text() === 'quality: plausible') {
     $quality.text('quality: genius');
     idea.quality = 'genius';
  }
  storeIdea();
});

$('.idea-list').on('click', '.delete-idea', function(){
  var id = $(this).parent().attr('id');
  var idea =  findIdea(id);
  deleteIdeaFromStorage(idea);
  $(this).parent().remove();
});

$('.idea-list').on('click', '.completed-todo', function(){
  var id = $(this).parent().parent().attr('id');
  var idea =  findIdea(id);
  markAsComplete(idea);
  //change to complete
  strikeThroughText(idea);
  // if complete is true, strikeThroughText
  storeIdea();
});

$('.idea-list').on('click', '.downvote', function() {
  var idea = findIdea($(this).parent().parent().attr('id'));
  var $quality = $(this).siblings('p');

  if ($quality.text() === 'quality: genius') {
    $quality.text('quality: plausible');
    idea.quality = 'plausible';
  } else if ($quality.text() === 'quality: plausible') {
    $quality.text('quality: swill');
    idea.quality = 'swill';
  }
  storeIdea();
});

$( "#search-bar" ).keyup(function() {
  var filterWord = $(this).val();
  var notTheIdeasIWant = $( 'li:not(:contains(' + filterWord + '))' );
  var theIdeaIWant = $('li:contains(' + filterWord + ')'
  );
  theIdeaIWant.show();
  notTheIdeasIWant.hide();
});

$('#save-button').on('click', function() {
  var titleInput = $('#title-input').val();
  var bodyInput = $('#body-input').val();
  generateNewIdea(titleInput, bodyInput);
  $('#title-input').focus();
});

$('#body-input').keypress(function(event) {
  if (event.which == 13) {
    var titleInput = $('#title-input').val();
    var bodyInput = $('#body-input').val();
    generateNewIdea(titleInput, bodyInput);
    $('#title-input').focus();
  }
});

module.exports = ideasList;
