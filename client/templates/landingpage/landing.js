Template.landing.helpers({

  children: function() {
    return Children.find({parent_id: Meteor.userId()}, {sort: {createdAt: 1}});
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
  },

  "change .profileImageInput": function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        if (err){
          console.log(err);
          // handle error
        } else {
          // handle success depending what you need to do
          var child = Session.get("childProImg");
          // console.log(child.id);
          var imagesURL = {
            profileImage: "/cfs/files/images/" + fileObj._id
          };
          console.log(fileObj._id);
          Meteor.call('updateChildProImg', child.id, imagesURL);
          console.log('image uploaded');
        }
      });
    });
  }

});

Template.landing.onRendered(function() {
 $(document).ready(function(){
    $("#navbar-logo").hide();
  });
});
