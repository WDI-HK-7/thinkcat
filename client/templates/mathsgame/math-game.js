var step = 0;
var correct = 0;
var wrong = 0;
var answers = [];
var question = ""
var _dep = new Deps.Dependency();
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

nextQuestion();

Template.mathGame.helpers({
  child: function () {
    var child = Session.get("child");
    return child;
  },
  question: function () {
    _dep.depend();
    return question;
  },
  answers: function () {
    _dep.depend();
    return answers
  },
  counter: function () {
    _dep.depend();
    if (step < 10) {
      return true;
    } else {
      return false;
    }
  },
  correctAns: function () {
    _dep.depend();
    return correct;
  },
  incorrectAns: function () {
    _dep.depend();
    return wrong;
  }
});

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
      var rightSound = new Audio('/sounds/Correct-answer.mp3');
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
      var wrongSound = new Audio('/sounds/Whip_bonk.wav');
      wrongSound.play();
      nextQuestion();
    }
  },
  'click #mathGameReturnHome': function(event) {
    var child = Session.get("child");
    step = 0;

    Meteor.call('addMathsScore', child.id, child.age, correct, wrong, answersArray);
    correct = 0;
    wrong = 0;
    
    Router.go('/child');
  },
  'click #mathGameRestart': function(event) {
    var child = Session.get("child");
    step = 0;

    Meteor.call('addMathsScore', child.id, child.age, correct, wrong, answersArray);
    correct = 0;
    wrong = 0;
    
    _dep.changed();
  }
});