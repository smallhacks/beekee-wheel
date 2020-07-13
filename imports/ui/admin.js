import { Template } from 'meteor/templating';

import { Wheels } from '../api/wheels.js';


import './admin.html';
import './backHeader.html';



Template.admin.onCreated(function() {

	Meteor.subscribe("users");
});


Template.admin.events({

	'click .admin--space-delete': function(e) {
		e.preventDefault();

		// if (confirm(TAPi18n.__('space-edit--delete-space-message'))) {
		// 	Meteor.call('deleteSpace', this._id, function(error) {
		// 		if (error)
		// 			alert(TAPi18n.__('error-message')+error.message);
		// 		else {
		// 			alert(TAPi18n.__('space-edit--delete-space-confirm-message'));
		// 		}
		// 	});
		// }
	},
	'click .admin--user-change-password': function(e) {
		e.preventDefault();

		// var newPassword = prompt(TAPi18n.__('admin--change-password-message')); // need to be a modal for hiding password
		// if (newPassword) {
		// 	Meteor.call('adminSetNewPassword', Meteor.user(), $(e.currentTarget).data('userid'), newPassword, function(error) {
		// 		if (error)
		// 			alert(TAPi18n.__('error-message')+error.message);
		// 		else
		// 			alert(TAPi18n.__('admin--change-password-confirm-message'));
		// 	});
		// }
	},
	'click .admin--user-delete': function(e) {
		e.preventDefault();

		// var userId = this._id;

		// if (confirm(TAPi18n.__('admin--user-delete-message'))) {
		// 	Meteor.call('deleteUser', userId, function(error) {
		// 		if (error)
		// 			alert(TAPi18n.__('error-message')+error.message);
		// 		else {
		// 			console.log("UserId : "+userId)
		// 			Meteor.call('deleteSpaces', userId, function(error) {
		// 				if (error)
		// 					alert(TAPi18n.__('error-message')+error.message);
		// 				else {
		// 					alert(TAPi18n.__('admin--user-delete-confirm-message'));
		// 				}
		// 			});
		// 		}
		// 	});
		// }
	}
});


Template.admin.helpers({

	wheels: function() {
		return Wheels.find({},{sort: {submitted: -1}});
	},
	user: function() {
		return Meteor.users.find({},{sort: {createdAt: -1}});
	},
	// isOnline: function() {
	// 	if (this.status.online)
	// 		return true
	// },
	wheelCreatedAt: function() {
		return moment(this.submitted).format("DD/MM/YYYY HH:mm");
	},
	wheelOwner:function() {
		ownerId = this.userId;
		return Meteor.users.findOne(ownerId).emails[0].address;
	},
	userCreatedAt: function() {
		return moment(this.createdAt).format("DD/MM/YYYY HH:mm");
	}
});