
import { Template } from 'meteor/templating';

import './wheelSubmit.html';

Template.wheelSubmit.onRendered(function () {

    $(".space-submit--form").validate({
        rules: {
            "spaceName": {
                required: true,
                minlength: 3,
                maxlength: 35
            }
        }
    }); 

    Session.set('numChars', 0); // Count the number of characters
});


Template.wheelSubmit.events({

	'submit form': function(e, template) {
		 e.preventDefault();

		var space = {
			name: $('#spaceName').val().trim(),
			lang: Session.get('lang')
		};

		Meteor.call('wheelInsert', space, function(error, result) {
			if(error)
				alert(error.message);
			else {
				//Router.go('space', {_id: result._id});
				$('#spaceSubmit').modal('hide');
				$('#spaceSubmit').on('hidden.bs.modal', function () {
    				Router.go('wheel', {_id: result._id});
				});
			}       
		});

		$('#spaceName').val('');
	},
	'click .space-submit--button-submit': function(e) {
		e.preventDefault();
		$('#space-submit--form').submit();
	},
	'input #spaceName': function(){
    	Session.set('numChars', $('#spaceName').val().length);
  	}
});


Template.wheelSubmit.helpers({

	'numChars': function(menuItemId) {
		return Session.get('numChars');
	},
});