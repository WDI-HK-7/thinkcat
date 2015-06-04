Children = new Mongo.Collection('children');
MathsGame = new Mongo.Collection('mathsGame');

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
  },
  
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