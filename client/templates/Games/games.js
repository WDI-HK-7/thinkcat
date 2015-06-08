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

  "click .animals-game": function(event, template) {
    Router.go('/animals')
  }
});