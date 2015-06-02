var requireLogin = function() { 
  if (! Meteor.user()) {
   // If user is not logged in render landingpage
   this.render('Landing'); 
 } else {
   //if user is logged in render whatever route was requested
   this.next(); 
 }
}

// Before any routing run the requireLogin function. 
// Except in the case of "landingpage". 
// Note that you can add more pages in the exceptions if you want. (e.g. About, Faq, contact...) 
Router.onBeforeAction(requireLogin, {except: ['Landing']});

Router.configure({

  // the appNotFound template is used for unknown routes and missing lists
  notFoundTemplate: 'appNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  loadingTemplate: 'appLoading',

  // wait on the following subscriptions before rendering the page to ensure
  // the data it's expecting is present
  waitOn: function() {
    return [
       Meteor.subscribe('children')
    ];
  }
});

Router.route('/landing', function() {
  
  this.render('Landing');
  
});

Router.route('/', function() {
  
  
  this.render('Main');
  
});

Router.route('/game/1', function() {
  
  this.render('Game1');
  
});