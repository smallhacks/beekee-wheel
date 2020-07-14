import { Meteor } from 'meteor/meteor';

import '../imports/api/wheels.js';
import '../imports/api/students.js';
import '../imports/api/publications.js';
import '../lib/app_loader.js';


Meteor.startup(() => {
  // code to run on server at startup

  	if (Meteor.users.find().count() === 0) {

		// Create the admin role
		//Roles.createRole('admin', {unlessExists: true});

		var adminPassword = Meteor.settings.adminPassword;

		var users = [
			{username:"admin",roles:['admin']},
		];

		_.each(users, function (user) {
			var id;
			id = Accounts.createUser({
				username: user.username,
				email: "admin@beekee.ch",
				//password: adminPassword,
				password: "admin",
				profile:{name:"Admin"}
			});

			if (user.roles.length > 0) {
				//Roles.addUsersToRoles(id, user.roles);
			}
		});
	}


});
