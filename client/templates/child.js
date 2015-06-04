Template.child.events({

  "click .game-one": function(event, template) {

    var child = {id: template.data._id, name: template.data.name};
    Session.setPersistent("child", child);
    console.log(child);

    Router.go('/game/1')

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