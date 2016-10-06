var ideasList = [];
var uncompletedIdeasList = [];
var $ = require('jQuery');
var end = 10;

function Idea(title, body, id, quality, completed) {
  this.id = id || Date.now() ;
  this.title = title;
  this.body = body;
  this.quality = quality || 'Normal';
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

function generateNewIdea(titleInput, bodyInput) {
  var idea = new Idea(titleInput, bodyInput);
  ideasList.push(idea);
  storeIdea();
  renderUncompletedIdeaToHTML(idea);
  clearFields();
}

function markAsComplete(idea){
  idea.completed = true;
}
function renderCompletedIdeaToHTML(idea) {

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
  }


  function renderUncompletedIdeaToHTML(idea) {

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

function storeIdea() {
  localStorage.setItem("ideasList", JSON.stringify(ideasList));
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
    renderUncompletedIdeaToHTML(idea);
    }
  });
}

function numIdeas() {
  var numIdeas = ideasList.length;
  var begin = 0;
  // var end = 10;

  //the button is clicked again add 10 the end variable

  slicedIdeas = ideasList.slice(begin, end);
  writeIdeas(slicedIdeas);
}

$(document).ready(function() {
  ideasList = JSON.parse(localStorage.getItem('ideasList')) || [];
  //find ideas that are not completed
  writeIdeas(ideasList);
});

$('#nextTen').on('click', function(){
  $('.list-li').remove();
  numIdeas();
  end = end + 10;
});


// uncompletedList = ideasList.filter(uncompletedIdeas);
// $('.list-li').remove();
// uncompletedList.forEach(function(idea){
//   renderUncompletedIdeaToHTML(idea);
// });

function criticalIdeas(idea){
  return idea.quality === 'Critical';
}

$('#btn-critical').on('click', function(){
  $('.list-li').remove();
  //when clicked, remove current todos
  criticalIdeas =ideasList.filter(criticalIdeas)
  writeIdeas(criticalIdeas);
  //filter through todos
  //return critical ideas
  //write critical ideas to page
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

$('#title-input').on('keyup', function () {
  var newTitle =  $(this).val();
  //count characters of new title
  charLength = newTitle.length++;
  $('#char-title').text("Character counter: " + charLength);
});

$('.idea-list').on('click', '.upvote', function() {
  var idea = findIdea($(this).parent().parent().attr('id'));
  var $quality = $(this).siblings('p');

  if ($quality.text() === 'quality: None') {
     $quality.text('quality: Low');
     idea.quality = 'Low';
  } else if ($quality.text() === 'quality: Low') {
     $quality.text('quality: Normal');
     idea.quality = 'Normal';
  } else if ($quality.text() === 'quality: Normal') {
     $quality.text('quality: High');
     idea.quality = 'High';
  } else if ($quality.text() === 'quality: High') {
     $quality.text('quality: Critical');
     idea.quality = 'Critical';
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
  var idTag = "#" + id;
  var idea =  findIdea(id);
  markAsComplete(idea);
  $('#'+id).children().addClass('completed');
  storeIdea();
});

$('.idea-list').on('click', '.downvote', function() {
  var idea = findIdea($(this).parent().parent().attr('id'));
  var $quality = $(this).siblings('p');

  if ($quality.text() === 'quality: Critical') {
    $quality.text('quality: High');
    idea.quality = 'High';
  } else if ($quality.text() === 'quality: High') {
    $quality.text('quality: Normal');
    idea.quality = 'Normal';
  } else if ($quality.text() === 'quality: Normal') {
    $quality.text('quality: Low');
    idea.quality = 'Low';
  } else if ($quality.text() === 'quality: Low') {
    $quality.text('quality: None');
    idea.quality = 'None';
  }
  storeIdea();
});

function completedIdeas(idea) {
  return idea.completed === true;
}

function uncompletedIdeas(idea) {
  return idea.completed === false;
}

$('#btn-completed').on('click', function() {
  ideasList = JSON.parse(localStorage.getItem('ideasList')) || [];
  completedList = ideasList.filter(completedIdeas);

  uncompletedList = ideasList.filter(uncompletedIdeas);
  $('.list-li').remove();
  uncompletedList.forEach(function(idea){
    renderUncompletedIdeaToHTML(idea);
  });
  completedList.forEach(function(idea) {
    renderCompletedIdeaToHTML(idea);
  });

});

$( "#search-bar" ).keyup(function() {
  var filterWord = $(this).val();
  var notTheIdeasIWant = $( 'li:not(:contains(' + filterWord + '))' );
  var theIdeaIWant = $('li:contains(' + filterWord + ')'
  );
  theIdeaIWant.show();
  notTheIdeasIWant.hide();
});

$('#btn-save').on('click', function() {
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
