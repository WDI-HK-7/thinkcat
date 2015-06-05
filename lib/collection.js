Children = new Mongo.Collection('children');
MathsGame = new Mongo.Collection('mathsGame');
ColoursGame = new Mongo.Collection('coloursGame');

Meteor.methods({
  
// -------------------------------------------- Add Child to DB
  
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
  
// -------------------------------------------- Remove Child from DB
  
  deleteChild: function(childId) {
    Children.remove(childId);
  },
  
// -------------------------------------------- Add Colours Score to DB
  
  addColoursScore: function(childId, childAge, correctScores, incorrectScores, answersArray) {
    
    if (!Meteor.userId()) {
      throw new Meteor.Error("not authorised");
    }
    
    var gameScore = {
      
      child_id: childId,
      child_age: childAge,
      parent_id: Meteor.userId(),
      results: answersArray,
      total_correct: correctScores,
      total_incorrect: incorrectScores,
      score: Math.floor(correctScores/(correctScores + incorrectScores)*100),
      createdAt: new Date()
    };

    ColoursGame.insert(gameScore);
    
  },
  
// -------------------------------------------- Create Colour Game Question
  
  createColourQuestion: function(colours) {

    var nextRandomColour = colours[Math.floor(Math.random()*colours.length)];
    
// -------------------------------------------- Update Random Colour in current Session

    Session.set('randomColour', nextRandomColour);
    
  },
  
  addMathsScore: function(childId, childAge, answersArray, correctScores, incorrectScores) {
    
    if (!Meteor.userId()) {
      throw new Meteor.Error("not authorised");
    }

    MathsGame.insert({

      child_id: childId,
      child_age: childAge,
      parent_id: Meteor.userId(),
      results: answersArray,
      total_correct: correctScores,
      total_incorrect: incorrectScores,
      score: Math.floor(correctScores/(correctScores + incorrectScores)*100),
      createdAt: new Date()
    });

  }

});