import { Mongo } from 'meteor/mongo';
 
export const Students = new Mongo.Collection('students');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('students', function studentsPublication() {
    return Students.find();
  });
}