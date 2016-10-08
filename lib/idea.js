function Idea(options){
  options = options || {};
  this.title = options.title;
  this.body = options.body;
  this.id = options.id || Date.now();
  this.quality = options.quality || 'Normal';
  this.completed = options.completed || false;
}


module.exports = Idea;
