Session.set('randomColour', coloursArray[Math.floor(Math.random()*coloursArray.length)]);

var coloursArray = [ "blue", "green", "yellow", "red" ];
var numCorrect = 0;
var numIncorrect = 0;
var answersArray = [];
var _dep = new Deps.Dependency();

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
    
  }
  
});

Template.colours.events({

// -------------------------------------------------------- Listen for Click on any Circle
  
  "click .circle": function(event) {
    
    var answer = Session.get("randomColour");

    var clickedColour = event.target.id;
    
    if (clickedColour === answer) {
      
      var newCorrectAnswer = {
        
        answer: answer,
        child_answer: clickedColour,
        correct: true
        
      };

      answersArray.push(newCorrectAnswer);

      numCorrect++;
      _dep.changed();
      createColourQuestion(coloursArray);
      
    }
    else {
      
      var newIncorrectAnswer = {
        
        answer: answer,
        child_answer: clickedColour,
        correct: false
        
      };
      
      answersArray.push(newIncorrectAnswer);
      
      numIncorrect++;
      
    }

  },
  
// -------------------------------------------------------- Listen for Finish Game
  
  "click .finish-game": function(event) {
    
    var child = Session.get("child");
    
    Meteor.call('addColoursScore', child.id, numCorrect, numIncorrect, answersArray);
    
    numCorrect = 0;
    numIncorrect = 0;
    
    Router.go('/');
    
  }

});
