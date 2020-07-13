import { Mongo } from 'meteor/mongo';
 
export const Students = new Mongo.Collection('wheel-students');

if (Meteor.isServer) {

  Meteor.publish('students', function studentsPublication() {
    return Students.find();
  });

	Meteor.methods({
		showAllStudents: function(params) {
    		Students.update({wheelId: params.wheelId}, {$set: {hidden: false}}, {multi: true});
		},
		hideAllStudents: function(params) {
    		Students.update({wheelId: params.wheelId}, {$set: {hidden: true}}, {multi: true});
		}
	});	
}