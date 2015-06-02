Meteor.publish('children', function() {
  
  return Children.find({parent_id: this.userId});
  
});