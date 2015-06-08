Children = new Mongo.Collection('children');
MathsGame = new Mongo.Collection('mathsGame');
ColoursGame = new Mongo.Collection('coloursGame');
ShapesGame = new Mongo.Collection('shapesGame');
AnimalsGame = new Mongo.Collection('animalsGame');

// -------- Declare image storing variable and colleciton with cfs package

var imageStore = new FS.Store.GridFS("images");
Images = new FS.Collection("images", {
  stores: [imageStore],
  filter: {
    maxSize: 4194304, //in bytes
    allow: {
      contentTypes: ['image/*']
    }
  },
  onInvalid: function (message) {
    if (Meteor.isClient) {
      alert(message);
    } else {
      console.log(message);
    }
  }
});

Images.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  },
  download: function(){
    return true;
  }
});

Meteor.methods({

// ----------------------------------------- update profile img url in child document

  updateChildProImg: function(id, data) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not authorised");
    }

    Children.update(id, {$set: data});
  },
  
// ------------------------------------------------------------------------------------ Add Child to DB
  
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
  
// ------------------------------------------------------------------------------------ Remove Child from DB
  
  deleteChild: function(childId) {
    Children.remove(childId);
  },
  
// ------------------------------------------------------------------------------------ Add Colours Game Score to DB
  
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

// ------------------------------------------------------------------------------------ Add Shapes Game Score to DB

  addShapesScore: function(childId, childAge, correctScores, incorrectScores, answersArray) {
    
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

    ShapesGame.insert(gameScore);
    
  },

// ------------------------------------------------------------------------------------ Add Animals Game Score to DB

  addAnimalsScore: function(childId, childAge, correctScores, incorrectScores, answersArray) {
    
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

    AnimalsGame.insert(gameScore);
    
  },

  // ------------------------------------------------------------------------------------ Add Maths Game Score to DB

  addMathsScore: function(childId, childAge, correctScores, incorrectScores, answersArray) {
    
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

    MathsGame.insert(gameScore);
    
  }

});