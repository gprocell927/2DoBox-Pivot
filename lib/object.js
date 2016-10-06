
var domObject = {
  ideasList: [],

  markAsComplete: function(idea){
    idea.completed = true;
  },

  findIdea: function(id) {
    return this.ideasList.find(function(idea) {
      return idea.id === parseInt(id);
    });
  }
};

module.exports = domObject;
