// --------------------------------------------------- Click Owl to go Home

Template.navbar.events({
  
  "click #navbar-logo": function(event, template) {
    Router.go('/');
  }
  
});

// --------------------------------------------------- Page Title Breadcrumbs

Template.navbar.helpers({
  
  currentPage: function() {
    
    var currentRoute = Router.current().route.path(this).split( "/" );
    var child = Session.get("child");
    
    console.log(currentRoute[1]);
    
    if (currentRoute[1] == '') {
      $('#path-title').html("HOME");
      console.log("hello world")
    }
    else if (currentRoute[1] == "child") {
      return "HOME / " + child.name.toUpperCase();
    }
    else if (currentRoute[1] == "shapes" || currentRoute[1] == "colours" || currentRoute[1] == "animals" || currentRoute[1] == "mathgame") {
      return "HOME / " + child.name.toUpperCase() + " / " + currentRoute[1].toUpperCase();
    }
    else {
      return "HOME / " + currentRoute[1].toUpperCase();
    }
    
  }
  
});

// --------------------------------------------------- Signed In Check

Template.navbar.helpers({

  signedIn: function() {
    return Meteor.user();
  }

});