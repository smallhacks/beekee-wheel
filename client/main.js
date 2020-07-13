import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../imports/ui/wheel.js';
import '../imports/ui/backHeader.js';
import '../imports/ui/indexHeader.js';
import '../imports/ui/wheelHeader.js';
import '../imports/ui/register.js';
import '../imports/ui/login.js';
import '../imports/ui/index.js';
import '../imports/ui/loading.html';
import '../imports/ui/wheelSubmit.js';
import '../imports/ui/userSettings.js';
import '../imports/ui/wheelSettings.js';
import '../imports/ui/admin.js';
import '/lib/router.js';
import '/lib/app_loader.js';


if (Meteor.isClient) {

 	// Allow cross-app login
 	// Store Token in a Cookie
	Accounts.onLogin(function(){
		console.log("We set a cookie with Token : "+Accounts._storedLoginToken());
		Cookie.set('_storedLoginToken', Accounts._storedLoginToken(), {domain:'beekee.box', expires: 30});
	});

	Tracker.autorun(function(){
		var user = Accounts.user();
		if (user === null) {
			console.log("We already have a token : "+Cookie.get('_storedLoginToken'));
			token = Cookie.get('_storedLoginToken');
			Accounts.loginWithToken(token, function(err) {
				console.log("Error while loginWithToken : "+err);
			});
		}
	});
}