
import { Template } from 'meteor/templating';
 
import { Wheels } from '../api/wheels.js';
import { Students } from '../api/students.js';

import './wheelHeader.html';

 
Template.wheelHeader.helpers({
  wheelName() {
  	if (typeof Wheels.findOne({_id:Session.get("wheelId")}) != "undefined")
  		return Wheels.findOne({_id:Session.get("wheelId")}).name;
  },
  wheelId() {
  	if (typeof Wheels.findOne({_id:Session.get("wheelId")}) != "undefined")
  		return Wheels.findOne({_id:Session.get("wheelId")})._id;
  },
  adminName: function() {
  		if (Meteor.user()) 
		return Meteor.user().profile.name;
	}
});