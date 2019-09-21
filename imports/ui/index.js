
import { Template } from 'meteor/templating';

import { Wheels } from '../api/wheels.js';

import './index.html';

Template.index.onCreated(function() {

	Deps.autorun(function() {
		TAPi18n.setLanguage(Session.get('lang')); // Translation of app-specific texts
	});
})


Template.index.helpers({

	ownWheels: function() {
		return Wheels.find({userId:Meteor.userId()}, {sort: {submitted: -1}});
	},
	langIsSelected: function(lang) {
		if (Session.get('lang') == lang)
			return 'selected'
	}
});

Template.index.events({

	'change #langSelect': function(e) {
		var lang = $(e.target).val();
		Session.setPersistent('lang',lang);
	}
});