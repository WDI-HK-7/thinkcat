Template.childProfile.helpers({

  child: function() {
    var child = Session.get("child");
    child = Children.findOne({_id: child.id});
    var mathsGameData = MathsGame.find({}).fetch();
    var coloursGameData = ColoursGame.find({}).fetch();
    console.log(mathsGameData);
    console.log(coloursGameData);
    return child;
  }

});

Template.childProfile.events({

  "click .game-one": function(event, template) {
    Router.go('/mathGame')
  },
  
  "click .colours-game": function(event, template) {
    Router.go('/colours');
  },

  "click .game-three": function(event, template) {
    Router.go('/game/3')
  },

  "click .game-four": function(event, template) {
    Router.go('/game/4')
  }

});