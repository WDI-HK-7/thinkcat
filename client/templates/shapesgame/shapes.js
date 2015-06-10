
var shapesArray = [ "triangle", "circle", "square", "rectangle", "star", "hexagon", "circle" ];
var step = 0;
var numCorrect = 0;
var numIncorrect = 0;
var answersArray = [];
var _dep = new Deps.Dependency();
var rightSound = new Audio('/sounds/Correct-answer.mp3');
var wrongSound = new Audio('/sounds/Whip_bonk.wav');
Session.set('randomShape', shapesArray[Math.floor(Math.random()*shapesArray.length)]);

// -------------------------------------------------------- Create Shape Game Question. Update Random Shape in Session

var createShapeQuestion = function(shapes) {

    var nextRandomShape = shapesArray[Math.floor(Math.random()*shapesArray.length)];

    Session.set('randomShape', nextRandomShape);
    
};

// -------------------------------------------------------- Handlebar helper function returns Session randomShape value

Handlebars.registerHelper('getRandomShape',function(){
  
  return Session.get("randomShape");
  
});

// -------------------------------------------------------- Return the Current Child Name and Id

Template.shapes.helpers({
  
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
     
  Meteor.call('addShapesScore', child.id, child.age, numCorrect, numIncorrect, answersArray);

  step = 0;
  numCorrect = 0;
  numIncorrect = 0;
  answersArray = [];
}

Template.shapes.events({

// -------------------------------------------------------- Listen for Click on any Circle
  
  "click .shape": function(event) {
    
    var answer = Session.get("randomShape");

    var clickedShape = event.target.id;
    
    if (clickedShape === answer) {
      
      var newCorrectAnswer = {
        
        answer: answer,
        child_answer: clickedShape,
        correct: true
        
      };
      
      rightSound.play();
      
      answersArray.push(newCorrectAnswer);

      numCorrect++;
      step++;
      _dep.changed();
      
      createShapeQuestion(shapesArray);
      
    }
    else {
      
      var newIncorrectAnswer = {
        
        answer: answer,
        child_answer: clickedShape,
        correct: false
        
      };
      
      wrongSound.play();
      
      answersArray.push(newIncorrectAnswer);
      
      numIncorrect++;
      step++;
      _dep.changed();
    
    }

  },
  
// -------------------------------------------------------- Listen for Return to Dashboard
  
  'click #backToDash': function(event) {
    saveGameResults();
    
    Router.go('/child');
  },

// -------------------------------------------------------- Listen for other games
  
  'click .maths-game': function(event) {
    saveGameResults();
    
    Router.go('/mathGame');
  },

  "click .colours-game": function(event, template) {
    saveGameResults();

    Router.go('/colours');
  },

  "click .shapes-game": function(event, template) {
    saveGameResults();

    _dep.changed();
  },

  "click .animals-game": function(event, template) {
    saveGameResults();

    Router.go('/animals');
  }

});
