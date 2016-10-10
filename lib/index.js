var Runner = require ('./runner.js');
var Idea = require ('./idea.js');
var $ = require('jquery');
require('../css/reset.scss');
require('../css/index.scss');

var runner = new Runner();
var idea = new Idea();
var end = 0;

$(document).ready(function() {
  runner.fetchIdeasList();
  $('#btn-save').prop("disabled",true);
  runner.writeIdeas(runner.ideasList);
});

$('#input-title').on('keypress', function() {
  if (($('#input-title').val() === "") || ($('#input-title').val().length > 120)){
    $('#btn-save').prop("disabled", true);
  } else {
    $('#btn-save').prop("disabled", false);
  }
  });

  $('#btn-nextTen').on('click', function(){
    $('.list-li').remove();
    end = end + 10;
    runner.numIdeas(end);
  });

  $('#btn-critical').on('click', function(){
    $('.list-li').remove();
    criticalIdeasList = runner.ideasList.filter(idea.criticalIdeas);
    runner.fetchIdeasList();
    runner.writeIdeas(criticalIdeasList);
  });

  $('#btn-high').on('click', function(){
    $('.list-li').remove();
    highIdeasList = runner.ideasList.filter(idea.highIdeas);
    runner.fetchIdeasList();
    runner.writeIdeas(highIdeasList);
  });

  $('#btn-normal').on('click', function(){
    $('.list-li').remove();
    normalIdeasList = runner.ideasList.filter(idea.normalIdeas);
    runner.fetchIdeasList();
    runner.writeIdeas(normalIdeasList);
  });

  $('#btn-low').on('click', function(){
    $('.list-li').remove();
    lowIdeasList = runner.ideasList.filter(idea.lowIdeas);
    runner.fetchIdeasList();
    runner.writeIdeas(lowIdeasList);
  });

  $('#btn-none').on('click', function(){
    $('.list-li').remove();
    noneIdeasList = runner.ideasList.filter(idea.noneIdeas);
    runner.fetchIdeasList();
    runner.writeIdeas(noneIdeasList);
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

  $('#input-title').on('keyup', function () {
    var newTitle =  $(this).val();
    charLength = newTitle.length++;

    $('#char-title').text("Character counter: " + charLength);
  });

  $('#input-body').on('keyup', function () {
    var newBody = $(this).val();
    charLength = newBody.length++;

    $('#char-body').text("Character counter: " + charLength);
  });

  $('.idea-list').on('click', '.upvote', function() {
    var id = $(this).parent().parent().attr('id');
    var idea = runner.findIdea(id);
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
    var id = $(this).parent().parent().attr('id')
    var idea = runner.findIdea(id);
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
       var completedList = runner.ideasList.filter(idea.completedIdeas);
       var uncompletedList = runner.ideasList.filter(idea.uncompletedIdeas);
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
    var $titleInput = $('#input-title').val();
    var $bodyInput = $('#input-body').val();
    runner.generateNewIdea($titleInput, $bodyInput);
    runner.clearFields();
    $('#input-title').focus();
  });

  $('#input-body').keypress(function(event) {
    if (event.which == 13) {
      var titleInput = $('#input-title').val();
      var bodyInput = $('#input-body').val();
      runner.generateNewIdea(titleInput, bodyInput);
      $('#input-title').focus();
    }
  });
