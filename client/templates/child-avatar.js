Template.childAvatar.events({

  "click .avatar": function(event, template) {
    var child = {id: template.data._id, name: template.data.name};
    Session.setPersistent("child", child);
    console.log(child);

    Router.go('/child')    
  }

});