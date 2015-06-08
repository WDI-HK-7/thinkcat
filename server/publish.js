Meteor.publish('children', function() {
  
  return Children.find({parent_id: this.userId});
  
});

Meteor.publish('mathsGame', function() {
  return MathsGame.find({});
});

Meteor.publish('coloursGame', function() {
  return ColoursGame.find({});
});

Meteor.publish('shapesGame', function() {
  return ShapesGame.find({});
});

Meteor.publish('animalsGame', function() {
  return AnimalsGame.find({});
});