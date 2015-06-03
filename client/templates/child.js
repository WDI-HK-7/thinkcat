Template.child.events({

  "click .game-one": function(event, template) {

    var child = {id: template.data._id, name: template.data.name};
    Session.setPersistent("child", child);
    console.log(child);

    Router.go('/mathGame')

  },
  
  "click .colours-game": function(event, template) {

    var child = {id: template.data._id, name: template.data.name};
    Session.setPersistent("child", child);
    console.log(child);

    Router.go('/colours');

  },

  "click .game-two": function(event, template) {

    var child = {id: template.data._id, name: template.data.name};
    Session.setPersistent("child", child);
    console.log(child);

    Router.go('/game/2')

  },

  "click .game-three": function(event, template) {

    var child = {id: template.data._id, name: template.data.name};
    Session.setPersistent("child", child);
    console.log(child);

    Router.go('/game/3')

  },

  "click .game-four": function(event, template) {

    var child = {id: template.data._id, name: template.data.name};
    Session.setPersistent("child", child);
    console.log(child);

    Router.go('/game/4')

  }

});