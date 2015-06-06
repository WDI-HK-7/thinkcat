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
    if (name == false || age == false) {
      $('#add-child-error').html("Please enter name and age");
    } else {
      Meteor.call('addChild', name, age);
      $('#add-child-error').html("");
      event.target.childName.value = '';
      event.target.childAge.value = '';
      $(".new-child").toggle();
      $("#add-child-btn").toggle();
    }

    return false;

  },

  "click #add-child-btn": function(event){
    $(".new-child").toggle();
    $("#add-child-btn").toggle();
  }

});

Template.landing.onRendered(function() {
 $(document).ready(function(){
    $("#navbar-logo").hide();
  });
});
