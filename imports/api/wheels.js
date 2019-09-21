import { Mongo } from 'meteor/mongo';
 
export const Wheels = new Mongo.Collection('wheels');



Wheels.allow({

	insert: function() { return true},
	update: function(userId, space) { return true},
	remove: function(userId, space) { return true},

	// insert: function(userId, space) { return ownsDocument(userId, space) || isAdmin(userId); },

	// update: function(userId, space) { return ownsDocument(userId, space) || isAdmin(userId); },

	// remove: function(userId, space) { return ownsDocument(userId, space) || isAdmin(userId); }
});


if(Meteor.isServer) {

	Meteor.methods({
		wheelInsert: function(wheelAttributes) {

			var user = Meteor.user();
			var wheel = _.extend(wheelAttributes, {
				userId: user._id,
				submitted: new Date(),
			});

			var wheelId = Wheels.insert(wheel);


			return { _id: wheelId };
		}
	});
}