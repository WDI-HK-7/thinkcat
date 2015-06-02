Children = new Mongo.Collection('children');

Meteor.methods({
  
  addChild: function(name, age) {
    
    if (!Meteor.userId()) {
      throw new Meteor.Error("not authorised");
    }
    
    Children.insert({

      name: name,
      age: age,
      parent_id: Meteor.userId(),
      createdAt: new Date()

    });

  },
  
  deleteChild: function(childId) {
    Children.remove(childId);
  }
  
});