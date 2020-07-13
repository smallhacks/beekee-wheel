
import { Template } from 'meteor/templating';

import './indexHeader.html';


Template.indexHeader.helpers({
	
	adminName: function() {
		return Meteor.user().profile.name;
	}
});