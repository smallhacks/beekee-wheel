import { Wheels } from '../imports/api/wheels.js';



Router.route('/', function () {
  	this.render('index');
}, {
name:'index'
});


Router.route('/wheel/:_id', function () {
  this.render('wheel', {
  	waitOn: function() {
  		  Meteor.subscribe('students');
  		},
    data: function () {	
    	return {wheelId:this.params._id}
 	}
  });
}, {
name:'wheel'
});

Router.route('/wheel/:_id/settings', function () {
  this.render('wheelSettings', {
  	waitOn: function() {
  		  //Meteor.subscribe('students');
  		},
    data: function () {	
    	return {wheelId:this.params._id}
 	}
  });
}, {
name:'wheelSettings'
});


Router.route('/register', function () {
  this.render('register', {
  	waitOn: function() {
  		  //Meteor.subscribe('students');
  		},
    data: function () {	
    	//return {classId:this.params._id}
 	}
  });
});

Router.route('/login', function () {
  this.render('login', {
  	waitOn: function() {
  		  //Meteor.subscribe('students');
  		},
    data: function () {	
    	//return {classId:this.params._id}
 	}
  });
});

Router.route('/user', function () {
  this.render('userSettings', {
  	waitOn: function() {
  		 // Meteor.subscribe('students');
  		},
    data: function () {	
    	//return {classId:this.params._id}
 	}
  });
}, {
name:'userSettings'
});


Router.route('/admin', function () {
  this.render('admin', {
  	waitOn: function() {
  		  //Meteor.subscribe('students');
  		},
    data: function () {	
    	//return {classId:this.params._id}
 	}
  });
});