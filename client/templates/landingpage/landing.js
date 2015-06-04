Template.landing.helpers({

  children: function() {
    return Children.find({parent_id: Meteor.userId()});
  },
  signedIn: function() {
    return Meteor.user();
  }

});

Template.landing.events({

  "submit .new-child": function(event) {

    var name = event.target.childName.value;
    var age = event.target.childAge.value;

    
    Meteor.call('addChild', name, age);
    
    event.target.childName.value = '';
    event.target.childAge.value = '';

    return false;

  }

});

Template.landing.onRendered(function() {
  $(document).on('click', '#add-child-btn', function(){
    $(".new-child").toggle();
  });
});