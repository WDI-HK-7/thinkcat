var animalsArray = ["cow", "pig", "monkey", "donkey", "dog", "sheep", "chicken", "cat"];
var step = 0;
var numCorrect = 0;
var numIncorrect = 0;
var answersArray = [];
var _dep = new Deps.Dependency();
var wrongSound = new Audio('/sounds/Whip_bonk.wav');
var rightSound = new Audio('/sounds/Correct-answer.mp3');

Session.set('randomAnimal', animalsArray[Math.floor(Math.random()*animalsArray.length)]);

// Create Animal Game Question

var createAnimalQuestion = function(animals) {

    var nextRandomAnimal = animalsArray[Math.floor(Math.random()*animalsArray.length)];

    Session.set('randomAnimal', nextRandomAnimal);
    
};

// Handlebar helper function returns Session randomShape value

Handlebars.registerHelper('getRandomAnimal',function(){
  
  return Session.get("randomAnimal");
  
});

// TEMPLATE HELPERS

Template.animals.helpers({

// Returns Current Child Playing

  child: function () {
  var child = Session.get("child");
  return child;
  console.log(child.name);
  },

// Updated Correct Answers
  
  updateCorrectAnswers: function() {
    
     _dep.depend();
    return numCorrect;
    
  },
  
// Updated Wrong Answers

  updateIncorrectAnswers: function() {

     _dep.depend();
    return numIncorrect;

  },

// Checks for Number of Correct Answers. When Max Answers Hit, End Game.

    counter: function () {
    
    _dep.depend();
    
    if (step < 10) {
      return true;
    } else {
      return false;
    }
    
  }
});

// TEMPLATE EVENTS 

Template.animals.events({

// Listen for Click Event on Animals

  "click .animal": function(event) {

    var answer = Session.get("randomAnimal");

    var clickedAnimal = event.target.id;

    if (clickedAnimal === answer) {

      var newCorrectAnswer = {
        answer: answer,
        child_answer: clickedAnimal,
        correct: true
      };

      rightSound.play();

      answersArray.push(newCorrectAnswer);

      numCorrect += 1;
      step += 1;
      _dep.changed();

      // Is passing in the animalsArray as the animals parameter necessary? Test to see if it still works.
      createAnimalQuestion(animalsArray);
    } else {

      var newIncorrectAnswer = {
        answer: answer,
        child_answer: clickedAnimal,
        correct: false
      };

      wrongSound.play();

      answersArray.push(newIncorrectAnswer);

      numIncorrect += 1;
      step += 1;
      _dep.changed();

    }

  },

// Listen for Return Home

  "click #animalsGameReturnHome": function(event) {

    var child = Session.get("child");
     
    Meteor.call('addAnimalsScore', child.id, child.age, numCorrect, numIncorrect, answersArray);

    step = 0;
    numCorrect = 0;
    numIncorrect = 0;
      
    Router.go('/games');

  },

// Listen for Game Restart

  "click #animalsGameRestart": function(event) {

    var child = Session.get("child");
     
    Meteor.call('addAnimalsScore', child.id, child.age, numCorrect, numIncorrect, answersArray);

    step = 0;
    numCorrect = 0;
    numIncorrect = 0;

    _dep.changed();

  }

});






