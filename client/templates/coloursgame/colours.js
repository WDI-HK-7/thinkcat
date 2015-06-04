var coloursArray = [ "blue", "green", "yellow", "red" ];

var numCorrect = 0;
var numIncorrect = 0;
var answersArray = [];
var _dep = new Deps.Dependency();

// -------------------------------------------- Create Colour Game Question
var createColourQuestion = function(colours) {

    var nextRandomColour = colours[Math.floor(Math.random()*colours.length)];
    
// -------------------------------------------- Update Random Colour in current Session

    Session.set('randomColour', nextRandomColour);
    
};

// -------------------------------------------------------- Set initial Session variable values
Session.set('randomColour', coloursArray[Math.floor(Math.random()*coloursArray.length)]);

// -------------------------------------------------------- Handlebar helper function returns Session randomColour value
Handlebars.registerHelper('getRandomColour',function(){
  
  return Session.get("randomColour");
  
});

Template.colours.helpers({
  
	child: function () {
		var child = Session.get("child");
		return child;
		console.log(child.name);
	},
  
// -------------------------------------------------------- update Correct Answers in Session
  updateCorrectAnswers: function() {
    
     _dep.depend();
    return numCorrect;
    
  }
  
});

Template.colours.events({

// -------------------------------------------------------- Listen for click event on any colour circle
  "click .circle": function(event) {
    
    var answer = Session.get("randomColour");

// -------------------------------------------------------- Save the id of the clicked circle (contains colour)
    var clickedColour = event.target.id;
    
    if (clickedColour === answer) {
      
      var newCorrectAnswer = {
        
        answer: answer,
        child_answer: clickedColour,
        correct: true
        
      };

// -------------------------------------------------------- If it's the right answer update the right answers in Session
      answersArray.push(newCorrectAnswer);
      console.log(answersArray);


      numCorrect++;
      _dep.changed();
// -------------------------------------------------------- update the Session random colour and display a new question     
      createColourQuestion(coloursArray);
      
    }
    else {
// -------------------------------------------------------- If it's wrong, update the wrong answers in Session    
      var newIncorrectAnswer = {
        
        answer: answer,
        child_answer: clickedColour,
        correct: false
        
      };
      
      answersArray.push(newIncorrectAnswer);
      console.log(answersArray);
      
      
      numIncorrect++;
      
    }

  },
// -------------------------------------------------------- Listen for the click to Finish Game
  "click .finish-game": function(event) {
    
// -------------------------------------------------------- Take the child object on finish and pass it to the storing score function
    var child = Session.get("child");
    
    Meteor.call('addColoursScore', child.id, numCorrect, numIncorrect, answersArray);
    
    numCorrect = 0;
    numIncorrect = 0;
    
    Router.go('/');
    
  }

});
