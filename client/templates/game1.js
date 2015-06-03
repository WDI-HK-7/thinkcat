Template.game1.helpers({
  child: function () {
    var child = Session.get("child");
    return child;
    // console.log(child.name)
  },
  question: function () {
    var question = "1 + 1 = ?"
    return question;
  },
  answers: function () {
    var answers = [1,2,3,4];
    return answers
  }

});