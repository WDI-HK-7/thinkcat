var requireLogin = function() { 
  if (! Meteor.user()) {
   // If user is not logged in render landingpage
   this.redirect('/'); 
   this.next();
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
  // we use the  appBody template to define the layout for the entire app
 layoutTemplate: 'appBody',
  
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

// ------------------------------------ Landing Page

Router.route('/', function() {
  
  this.render('Landing');
  
});

// ------------------------------------ Children Accounts Overview Page

Router.route('/child', function() {
  Meteor.subscribe('mathsGame');
  Meteor.subscribe('coloursGame');
  Meteor.subscribe('shapesGame');
  Meteor.subscribe('animalsGame');
  this.render('childProfile');
});

// ------------------------------------ Games Page

Router.route('/games', function() {
  this.render('Games');
});

// ------------------------------------ Maths Game Page

Router.route('/mathgame', function() {
  this.render('mathGame');
});

// ------------------------------------ Colours Game Page

Router.route('/colours', function() {
  this.render('Colours');
});

// ------------------------------------ Shapes Game Page

Router.route('/shapes', function() {
  this.render('Shapes');
});

// ------------------------------------ Animals Game Page

Router.route('/animals', function() {
  this.render('Animals');
});
