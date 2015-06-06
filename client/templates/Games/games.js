Template.games.events({
  "click .maths-game": function(event, template) {
    Router.go('/mathGame');
  },
  
  "click .colours-game": function(event, template) {
    Router.go('/colours');
  },

  "click .shapes-game": function(event, template) {
    Router.go('/shapes');
  },

  "click .game-four": function(event, template) {
    Router.go('/game4')
  }
});