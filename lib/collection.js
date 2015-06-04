Children = new Mongo.Collection('children');
MathsGame = new Mongo.Collection('mathsGame');
ColoursGame = new Mongo.Collection('coloursgame');

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
<<<<<<< HEAD
=======
  
// -------------------------------------------- Add Colours Score to DB
  
  addColoursScore: function(childId, correctScores, incorrectScores, answersArray) {
    
    if (!Meteor.userId()) {
      throw new Meteor.Error("not authorised");
    }
    
    var gameScore = {
      
      child_id: childId,
      results: answersArray,
      total_correct: correctScores,
      total_incorrect: incorrectScores,
      score: Math.floor(correctScores/(correctScores + incorrectScores)*100)
      
    };

    ColoursGame.insert(gameScore);
    
  },
  
// -------------------------------------------- Create Colour Game Question
  
  createColourQuestion: function(colours) {

    var nextRandomColour = colours[Math.floor(Math.random()*colours.length)];
    
// -------------------------------------------- Update Random Colour in current Session

    Session.set('randomColour', nextRandomColour);
    
  }
>>>>>>> updated colour button route to avoid IR bug. Generate random colour question based on four coloured divs. Store correct/wrong answers in Session temp variable. Generate a new question after every correct answer.
  
  addMathsScore: function(childId, answersArray, correctScores, incorrectScores) {
    
    if (!Meteor.userId()) {
      throw new Meteor.Error("not authorised");
    }

    MathsGame.insert({

      child_id: childId,
      results: answersArray,
      total_correct: correctScores,
      total_incorrect: incorrectScores,
      score: Math.floor(correctScores/(correctScores + incorrectScores)*100),
      createdAt: new Date()
    });

  }

});