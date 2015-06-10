
var coloursArray = [ "blue", "green", "yellow", "red", "purple" ];
var step = 0;
var numCorrect = 0;
var numIncorrect = 0;
var answersArray = [];
var _dep = new Deps.Dependency();
var rightSound = new Audio('/sounds/Correct-answer.mp3');
var wrongSound = new Audio('/sounds/Whip_bonk.wav');
Session.set('randomColour', coloursArray[Math.floor(Math.random()*coloursArray.length)]);

// -------------------------------------------------------- Create Colour Game Question. Update Random Colour in Session

var createColourQuestion = function(colours) {

    var nextRandomColour = colours[Math.floor(Math.random()*colours.length)];

    Session.set('randomColour', nextRandomColour);
    
};

// -------------------------------------------------------- Handlebar helper function returns Session randomColour value

Handlebars.registerHelper('getRandomColour',function(){
  
  return Session.get("randomColour");
  
});

// -------------------------------------------------------- Return the Current Child Name and Id

Template.colours.helpers({
  
	child: function () {
		var child = Session.get("child");
		return child;
		console.log(child.name);
	},
  
// -------------------------------------------------------- Render Updated Correct Answers
  
  updateCorrectAnswers: function() {
    
     _dep.depend();
    return numCorrect;
    
  },
  
// -------------------------------------------------------- Render Updated Wrong Answers

  updateIncorrectAnswers: function() {

     _dep.depend();
    return numIncorrect;

  },

// -------------------------------------------------------- Check Number of Correct Answers
  
  counter: function () {
    
    _dep.depend();
    
    if (step < 10) {
      return true;
    } else {
      return false;
    }
    
  },
  
});

//-------------------------------- Function to save the answers at end of game

var saveGameResults = function() {
  var child = Session.get("child");
     
  Meteor.call('addColoursScore', child.id, child.age, numCorrect, numIncorrect, answersArray);

  step = 0;
  numCorrect = 0;
  numIncorrect = 0;
  answersArray = [];
}

Template.colours.events({

// -------------------------------------------------------- Listen for Click on any Circle
  
  "click .pencil": function(event) {
    
    var answer = Session.get("randomColour");

    var clickedColour = event.target.id;
    
    if (clickedColour === answer) {
      
      var newCorrectAnswer = {
        
        answer: answer,
        child_answer: clickedColour,
        correct: true
        
      };
      
      rightSound.play();
      
      answersArray.push(newCorrectAnswer);

      numCorrect++;
      step++;
      _dep.changed();
      
      createColourQuestion(coloursArray);
      
    }
    else {
      
      var newIncorrectAnswer = {
        
        answer: answer,
        child_answer: clickedColour,
        correct: false
        
      };
      
      wrongSound.play();
      
      answersArray.push(newIncorrectAnswer);
      
      numIncorrect++;
      step++;
      _dep.changed();

      
    }

  },
  
// -------------------------------------------------------- Listen for Return Home
  
  'click #backToDash': function(event) {
     
    saveGameResults();
      
    Router.go('/child');
     
  },

// -------------------------------------------------------- go to other games
  
  'click .maths-game': function(event) {
    saveGameResults();
    
    Router.go('/mathGame');
  },

  "click .colours-game": function(event, template) {
    saveGameResults();

    _dep.changed();
  },

  "click .shapes-game": function(event, template) {
    saveGameResults();

    Router.go('/shapes');
  },

  "click .animals-game": function(event, template) {
    saveGameResults();

    Router.go('/animals');
  }

});
