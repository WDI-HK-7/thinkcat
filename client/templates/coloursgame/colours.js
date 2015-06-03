// -------------------------------------------------------- Establish a global varibale coloursArray
coloursArray = [ "blue", "green", "yellow", "red" ];

// -------------------------------------------------------- Set initial Session variable values
Session.set('wrongAnswers', 0);
Session.set('rightAnswers', 0);
Session.set('randomColour', coloursArray[Math.floor(Math.random()*coloursArray.length)]);

// -------------------------------------------------------- Handlebar helper function returns Session randomColour value
Handlebars.registerHelper('getRandomColour',function(){
  
  return Session.get("randomColour");
  
});

Template.colours.helpers({
  
	child: function () {
		var child = Session.get("child");
		return child;
		console.log(child.name)
	},
  
// -------------------------------------------------------- update Correct Answers in Session
  updateCorrectAnswers: function() {
    
    var correctAnswers = Session.get('rightAnswers');
    return correctAnswers;
    
  }
  
});

Template.colours.events({

// -------------------------------------------------------- Listen for click event on any colour circle
  "click .circle": function(event) {
    
    var answer = Session.get("randomColour");

// -------------------------------------------------------- Save the id of the clicked circle (contains colour)
    var clickedColour = event.target.id;
    
    if (clickedColour === answer) {

// -------------------------------------------------------- If it's the right answer update the right answers in Session
      Session.set('rightAnswers', Session.get('rightAnswers') + 1);
      
      console.log("Total right: " + Session.get('rightAnswers'));
      
// -------------------------------------------------------- update the Session random colour and display a new question     
      Meteor.call('createColourQuestion');
      
    }
    else {
// -------------------------------------------------------- If it's wrong, update the wrong answers in Session    
      Session.set('wrongAnswers', Session.get('wrongAnswers') + 1);
      
      console.log("Total wrong: " + Session.get('wrongAnswers'));
      
    }
    

  },
// -------------------------------------------------------- Listen for the click to Finish Game
  "click .finish-game": function(event) {
    
// -------------------------------------------------------- Take the child object on finish and pass it to the storing score function
    var child = Session.get("child");
    
    Meteor.call('addColoursScore', child.id);
    
  }

});
