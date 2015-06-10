var colours = ['aqua','coral','grey','yellow'];
var counter = 0;
var step = 0;
var correct = 0;
var wrong = 0;
var answers = [];
var question = ""
var _dep = new Deps.Dependency();
var answersArray = [];

//---------------- function to render the next question

var nextQuestion = function() {
  var num1 = Math.ceil(Math.random()*10);
  var num2 = Math.ceil(Math.random()*10);
  question = num1 + " + " + num2;
  answers = [];
  var ans = eval(question);
  answers = [ans,ans-1,ans+1,ans+2];
  answers = _.shuffle(answers);
  _dep.changed();
};
var answersArray = [];
var rightSound = new Audio('/sounds/Correct-answer.mp3');
var wrongSound = new Audio('/sounds/Whip_bonk.wav');

nextQuestion();

Template.mathGame.helpers({

  //------------------------------- Return current child info

  child: function () {
    var child = Session.get("child");
    return child;
  },

  //------------------------------- Render the question

  question: function () {
    _dep.depend();
    return question;
  },

  //------------------------------- Render the Answers

  answers: function () {
    _dep.depend();
    return answers
  },

  //------------------------------- Render questions until 10 questions are answered

  counter: function () {
    _dep.depend();
    if (step < 10) {
      return true;
    } else {
      return false;
    }
  },

  //------------------------------- Render correct answers

  correctAns: function () {
    _dep.depend();
    return correct;
  },

  //------------------------------- Render incorrect answers

  incorrectAns: function () {
    _dep.depend();
    return wrong;
  },

  //------------------------------- Give a different colour for the answers button

	buttonColour: function() {
		var colour = colours[counter];
		if (counter == colours.length - 1) {
			counter = 0;
		} else {
			counter += 1;
		}
		return colour;
	}
});

//-------------------------------- Function to save the answers at end of game

var saveGameResults = function() {
  var child = Session.get("child");
  step = 0;

  Meteor.call('addMathsScore', child.id, child.age, correct, wrong, answersArray);
  correct = 0;
  wrong = 0;
  answersArray = [];
}

//-------------------------------- Answer checker when user submits answer

Template.mathGame.events({
  'click .mathGameAns': function(event) {
    var ans = event.target.innerHTML;
    if (eval(question) == ans) {
      correct += 1;
      var questionHash = { 
        question: question,
        correct: true,
        answer: eval(question),
        child_answer: wrong
      }
      answersArray.push(questionHash);
      step += 1;
      rightSound.play();
      nextQuestion();
    } else {
      wrong += 1;
      var questionHash = { 
        question: question,
        correct: false,
        answer: eval(question),
        child_answer: ans
      }
      answersArray.push(questionHash);
      step += 1;
      wrongSound.play();
      nextQuestion();
    }
  },

  //----------------------- listen for return to dashboard

  'click #backToDash': function(event) {
    saveGameResults();
    
    Router.go('/child');
  },

  //----------------------- listen for going to other games

  'click .maths-game': function(event) {
    saveGameResults();
    
    _dep.changed();
  },

  "click .colours-game": function(event, template) {
    saveGameResults();

    Router.go('/colours');
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

