var counter = 0;
var colours = ['aqua','coral','grey','yellow'];
Template.childAvatar.events({

  "click .dash-button": function(event, template) {
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
  },

  "click .avatar": function(event, template) {
    $('input:file').trigger('click');
    var child = {id: template.data._id, name: template.data.name, age: template.data.age};
    Session.set("childProImg", child);
    console.log(child);
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
	},

  profileImg: function(template) {
    return this.profileImage || "http://images.watoday.com.au/2010/12/22/2105997/kids-swing-3-4-420-420x0.jpg"
  }
});