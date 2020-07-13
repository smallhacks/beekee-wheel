
import { Template } from 'meteor/templating';

import './userSettings.html';
import './backHeader.html';

Template.userSettings.events({

	'click .user-settings--change-password': function(e) { // Change user password
		e.preventDefault();

		var oldPassword = prompt("Ancien mot de passe");
		if (oldPassword) 
			var newPassword = prompt("Nouveau mot de passe");
		if (newPassword) {
			Accounts.changePassword(oldPassword, newPassword, function(error) {
				if (error)
					alert(error.message);
				else
					alert("Mot de passe changé");
			});
		}
	},
	'click .user-settings--logout': function(e) {
		e.preventDefault();

		if (confirm("Souhaitez-vous vous déconnecter ?")) {
			Meteor.logout(function(err) {
				Router.go('index');
			});
		}
	}
});