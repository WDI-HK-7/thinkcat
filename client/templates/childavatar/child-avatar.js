var counter = 0;
var colours = ['aqua','coral','grey','yellow'];
Template.childAvatar.events({

  "click .avatar": function(event, template) {
    var child = {id: template.data._id, name: template.data.name, age: template.data.age};
    Session.setPersistent("child", child);
    console.log(child);

    Router.go('/child');
  },

  "click .play-button": function(event, template) {
    var child = {id: template.data._id, name: template.data.name, age: template.data.age};
    Session.setPersistent("child", child);
    console.log(child);

    Router.go('/games');
  }

});

Template.childAvatar.helpers({
	featureBox: function() {
		var colour = colours[counter];
		if (counter == 3) {
			counter = 0;
		} else {
			counter += 1;
		}
		return colour + "-feature-box"
	}
});