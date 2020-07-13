import { Template } from 'meteor/templating';

import { Students } from '../api/students.js';
import { Wheels } from '../api/wheels.js';

import './wheelSettings.html';
import './backHeader.html';



Template.wheelSettings.events({

	'click .settings--add-student': function(e) {
		e.preventDefault();
		var newStudent = prompt("Nom de l'élève :");
		if (newStudent.length < 1 || newStudent.length > 14) {
			alert("The name must be at least 1 character and at most 14");
		} else {
			Students.insert({name:newStudent, wheelId:this.wheelId, hidden:false});
		}
	},
	'click .settings--delete-student': function(e) {
		e.preventDefault();

		if (confirm(TAPi18n.__('admin--user-delete-message'))) {
			Students.remove(this._id);
		}

		// var newStudent = prompt("Nom de l'élève :");
		// if (newStudent.length < 1 || newStudent.length > 14) {
		// 	alert("The name must be at least 1 character and at most 14");
		// } else {
		// 	Students.insert({name:newStudent,classId:this.classId});
		// }
	},
	'click .settings--edit-student': function(e) {
		e.preventDefault();

		var newName = prompt(TAPi18n.__('admin--user-edit-message'),this.name); // need to be a modal for hiding password
		if (newName) {
			Students.update(this._id,{ $set: {name: newName}});
		}
	},
		'click .wheel-settings--show-student': function(e) {
		e.preventDefault();

		Students.update(this._id,{ $set: {hidden: false}});
	},
		'click .wheel-settings--hide-student': function(e) {
		e.preventDefault();

		Students.update(this._id,{ $set: {hidden: true}});
	},
	'click .wheel-settings--show-all': function(e) {
		e.preventDefault();
		Meteor.call('showAllStudents',{wheelId:this.wheelId});
	},
		'click .wheel-settings--hide-all': function(e) {
		e.preventDefault();
		Meteor.call('hideAllStudents',{wheelId:this.wheelId});
	},
	'click .wheel-settings--delete-wheel': function(e) {
		e.preventDefault();

		if (confirm("Do you want to delete this wheel?")) {
			Wheels.remove(this.wheelId);
			Router.go('index');
		}
	}
});

Template.wheelSettings.helpers({
  students() {
  	return Students.find({wheelId: this.wheelId});
  },
  studentHidden() {
  	if (this.hidden == true)
  		return true
  	else
  		return false
  }
});