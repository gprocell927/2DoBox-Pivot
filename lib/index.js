var Runner = require ('./runner.js');
var Idea = require ('./idea.js');
var $ = require('jquery');
require('../css/reset.scss');
require('../css/index.scss');

var runner = new Runner();
var idea = new Idea();

$(document).ready(function() {
  runner.fetchIdeasList();
  $('#btn-save').prop('disabled', true);
  runner.writeIdeas(runner.ideasList);
});

$('#title-input').on('keypress', function() {
  if ($(this).val() === "" || $(this).val().length > 120){
    $('#btn-save').prop('disabled', true);
  } else {
    $('#btn-save').prop('disabled', false);
  }
  });

  $('#nextTen').on('click', function(){
    $('.list-li').remove();
    runner.numIdeas();
    end = end + 10;
  });

  $('#btn-critical').on('click', function(){
    $('.list-li').remove();
    criticalIdeas =runner.ideasList.filter(criticalIdeas);
    runner.writeIdeas(criticalIdeas);
  });

  $('.idea-list').on('focusout', '.body-input', function(){
    var id = $(this).parent().attr('id');
    var newBody =  $(this).text();
    runner.updateBody(id, newBody);
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
    runner.updateTitle(id, newTitle);
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
    runner.storeIdea();
  });

  $('.idea-list').on('click', '.delete-idea', function(){
    var id = $(this).parent().attr('id');
    var idea =  runner.findIdea(id);
    runner.deleteIdeaFromStorage(idea);
    $(this).parent().remove();
  });

  $('.idea-list').on('click', '.completed-todo', function(){
    var id = $(this).parent().parent().attr('id');
    var idTag = "#" + id;
    var idea =  runner.findIdea(id);
    idea.markAsComplete(idea);
    $('#'+id).children().addClass('completed');
    runner.storeIdea();
  });

  $('.idea-list').on('click', '.downvote', function() {
    var idea = runner.findIdea($(this).parent().parent().attr('id'));
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
    runner.storeIdea();
  });

  $('#btn-completed').on('click', function() {
    ideasList = JSON.parse(localStorage.getItem('ideasList')) || [];
    completedList = runner.ideasList.filter(completedIdeas);

    uncompletedList = runner.ideasList.filter(uncompletedIdeas);
    $('.list-li').remove();
    uncompletedList.forEach(function(idea){
      idea.renderUncompletedIdeaToHTML(idea);
    });
    completedList.forEach(function(idea) {
      idea.renderCompletedIdeaToHTML(idea);
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
    var $titleInput = $('#title-input').val();
    var $bodyInput = $('#body-input').val();
    runner.generateNewIdea($titleInput, $bodyInput);
    $('#title-input').focus();
  });

  $('#body-input').keypress(function(event) {
    if (event.which == 13) {
      var titleInput = $('#title-input').val();
      var bodyInput = $('#body-input').val();
      runner.generateNewIdea(titleInput, bodyInput);
      $('#title-input').focus();
    }
  });
