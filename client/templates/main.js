

if (Meteor.isClient) {

  Template.main.helpers({
    
    children: function() {
      return Children.find({});
    }
    
  });
  
  Template.main.events({
    
    "submit .new-child": function(event) {
      
      var name = event.target.childName.value;
      var age = event.target.childAge.value;
      
      console.log('Name is ' + typeof(name));
      console.log('Age is ' + typeof(age));
      
      
      Children.insert({
        
        name: name,
        age: age,
        createdAt: new Date()
        
      });
      
      event.target.childName.value = '';
      event.target.childAge.value = '';
      
      return false;
      
    }
    
  });

}
