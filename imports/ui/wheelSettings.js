
import { Template } from 'meteor/templating';

import { Students } from '../api/students.js';

import './wheelSettings.html';
import './backHeader.html';



Template.wheelSettings.events({

	'click .settings--add-student': function(e) {
		e.preventDefault();
		var newStudent = prompt("Nom de l'élève :");
		if (newStudent.length < 1 || newStudent.length > 14) {
			alert("The name must be at least 1 character and at most 14");
		} else {
			Students.insert({name:newStudent,wheelId:this.wheelId});
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
});

Template.wheelSettings.helpers({
  students() {
  	return Students.find({wheelId: this.wheelId});
  }
});