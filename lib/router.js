import { Wheels } from '../imports/api/wheels.js';



// Router.route('/', function () {
//   	this.render('index');
// }, {
// name:'index'
// });


Router.route('/', {
  // this template will be rendered until the subscriptions are ready
  //loadingTemplate: 'loading',
  name:'index',

  waitOn: function () {
    // return one handle, a function, or an array
    if (Meteor.userId()) {
        return Meteor.subscribe('ownWheels', Meteor.userId());
    }
  },
    data: function () {  
      return {wheelId:this.params._id}
   },
  action: function () {
    this.render('index');
  }
});



Router.route('/wheel/:_id', {
  // this template will be rendered until the subscriptions are ready
  //loadingTemplate: 'loading',
  name:'wheel',

  waitOn: function () {
    // return one handle, a function, or an array
    return Meteor.subscribe('students');
  },
    data: function () {  
      return {wheelId:this.params._id}
   },
  action: function () {
    this.render('wheel');
  }
});


Router.route('/wheel/:_id/settings', {
  // this template will be rendered until the subscriptions are ready
  //loadingTemplate: 'loading',
  name:'wheelSettings',

  waitOn: function () {
    // return one handle, a function, or an array
    return Meteor.subscribe('students');
  },
    data: function () {  
      return {wheelId:this.params._id}
   },
  action: function () {
    this.render('wheelSettings');
  }
});


// Router.route('/wheel/:_id/settings', function () {
//   this.render('wheelSettings', {
//   	waitOn: function() {
//   		  return Meteor.subscribe('students');
//   		},
//     data: function () {	
//     	return {wheelId:this.params._id}
//  	}
//   });
// }, {
// name:'wheelSettings'
// });


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