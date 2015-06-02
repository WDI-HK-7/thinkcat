
Router.route('/', function() {
  
  this.render('Landing');
  
});

Router.route('/main', function() {
  
  Meteor.subscribe('children');
  
  this.render('Main');
  
});

Router.route('/game/1', function() {
  
  this.render('Game1');
  
});