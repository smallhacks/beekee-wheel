
import { Template } from 'meteor/templating';
 
import { Wheels } from '../api/wheels.js';
import { Students } from '../api/students.js';

import './wheel.html';
import './wheelHeader.html';


Template.wheel.onCreated(function() {

			TAPi18n.setLanguage(Session.get('lang')); // Translation of app-specific texts


	// Deps.autorun(function() {
	// 	TAPi18n.setLanguage(Session.get('lang')); // Translation of app-specific texts
	// });
})


Template.wheel.events({

	'click #spinButton': function(e) {
		e.preventDefault();
		$('#spinButton').animate({width: "34%", left: "33.5%", height:"34%",top: "32.5%"}, 80).animate({width: "32%", left: "34.5%", height:"32%",top: "33.5%"}, 140);
		spin();
	}
});

 
Template.wheel.helpers({
  wheelId() {
  	return this.wheelId
  },
  students() {
  		var students = Students.find({wheelId: this.wheelId});
  	if (students.count() > 0)
  		return Students.find({wheelId: this.wheelId});
  	else return null;
  }
});


Template.wheel.onRendered(function () {

	timeOut = null;
	wheelStopped = true;

	Session.set("wheelId",this.data.wheelId);


		// Deps.autorun(function() {
	init(Session.get("wheelId"));
// });

	//Class.insert({name:"506"});
	//Students.insert({classId:"zx6XWsW6m5wEaLE6Y",name:"antoine"});
	toastr.options = {
	  	"positionClass": "toast-center-center",
	  	  "showDuration": "3000000",
	  	    "hideDuration": "1000000",
	  	      "timeOut": "5000000",
  "extendedTimeOut": "1000000",


	}
});

// Template.wheel.helpers({
//   class() {
//   	console.log("nombre : "+Class.find({}).count());
//     return Class.find({}).count();
//   },
// });


function init(wheelId) {

	// Get students list
	//students = JSON.parse(localStorage.getItem("students"));

	//students = Students.find({classId:classId}).fetch();

 students = Students.find({wheelId:wheelId}).map(function (doc) {
  return doc.name;
});


 if (students.length > 0) {

	// Get colors
	colors = ["7d58bf","a345b7","e73f78","ec5b51","f86c41","f8a126","f7c42b","f7e657","ceda55","97c561","63b668","27a498","25c0d4","27b0ee","41a1ef","5a66ba","7d58bf","a345b7","e73f78","ec5b51","f86c41","f8a126","f7c42b","f7e657","ceda55","97c561","63b668"];
	//colors = [localStorage.getItem("color1"), localStorage.getItem("color2"), localStorage.getItem("color3"), localStorage.getItem("color4"), localStorage.getItem("color5"),localStorage.getItem("color1"), localStorage.getItem("color2"), localStorage.getItem("color3"), localStorage.getItem("color4"), localStorage.getItem("color5"),localStorage.getItem("color1"), localStorage.getItem("color2"), localStorage.getItem("color3"), localStorage.getItem("color4"), localStorage.getItem("color5"),localStorage.getItem("color1"), localStorage.getItem("color2"), localStorage.getItem("color3"), localStorage.getItem("color4"), localStorage.getItem("color5"),localStorage.getItem("color1"), localStorage.getItem("color2"), localStorage.getItem("color3"), localStorage.getItem("color4"), localStorage.getItem("color5"),localStorage.getItem("color1"), localStorage.getItem("color2"), localStorage.getItem("color3"), localStorage.getItem("color4"), localStorage.getItem("color5")]; 

	// Divide the wheel by the number of students and store the students' angles
    studentsAngles = [];
    for (var i = 0 ; i < students.length; i++) {
      studentsAngles.unshift(i*(360)/students.length);
    }

	// Set default degree (360*5) + clicks
	degree = 1800;
	clicks = 0;

	drawWheel();
}
}


function drawWheel() {

	var canvas = document.getElementById('wheel');
	var context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);

	var x = canvas.width / 2;
	var y = canvas.height / 2;

	var segmentWidth = 360 / students.length;
	var startAngle = 0;
	var endAngle = segmentWidth;
	var segmentDepth = 244;

	//resizeCanvasToDisplaySize(canvas);

	// Store students' angles


	// Draw outer circle
	context.save();
	context.beginPath();
	context.lineWidth = 20;
	context.shadowColor = 'black';
	context.strokeStyle = "white";
	context.shadowBlur = 15;
	context.shadowOffsetX = 0;
	context.shadowOffsetY = 0;
	context.arc(x, y, 370, 0, 2 * Math.PI, false);
	context.stroke();
	context.restore();
	context.save();
	context.beginPath();
	context.lineWidth = 6;
	context.stroke();
	context.restore();

    for (var i = 0; i < students.length; i++){  

    	// Draw segments
	    context.beginPath();
	    context.arc(x, y, segmentDepth, (startAngle * Math.PI / 180), (endAngle * Math.PI / 180), false);
	    context.lineWidth = segmentDepth;
	    context.strokeStyle = '#'+colors[i];
	    context.stroke();
	    context.save();

	    // Draw little points
      	context.beginPath();
      	xPoint = 400 + Math.cos(startAngle* Math.PI / 180)*372;
      	yPoint =400 + Math.sin(startAngle* Math.PI / 180)*372;
	    context.arc(xPoint,yPoint,4,0,2* Math.PI);
	    context.fillStyle = '#464646';
	    context.fill();
	    context.lineWidth = 0.1;
	    context.strokeStyle = '#464646';

	    // Draw students' name
	    context.translate(x,y);

      	context.rotate((startAngle+(0.6*segmentWidth)) * Math.PI / 180);
      	context.fillStyle = 'white';
      	context.font= "25px Arial";
      	context.fillText(students[i],150,0);
      	context.restore();

		// Increase per segment        
	    startAngle += segmentWidth;
	    endAngle += segmentWidth;
    }   
}

function editStudents() {

	var oldStudents = JSON.parse(localStorage.getItem("students"));
  	var newStudents = prompt("Séparez les noms d'élèves par des virgules", oldStudents).split(",");

  	localStorage.setItem("students", JSON.stringify(newStudents));
	
	init();
}

function editColor(jscolor) {
	localStorage.setItem("color1", $('.color1').val());
    localStorage.setItem("color2", $('.color2').val());
    localStorage.setItem("color3", $('.color3').val());
    localStorage.setItem("color4", $('.color4').val());
    localStorage.setItem("color5", $('.color5').val());
    
    init();
}


function spin() {

    $( "#spinButton span" ).hide();
    wheelStopped = true;

    clicks ++;
    /* Multiply the degree by number of clicks
    generate random number between 1 - 360, 
    then add to the new degree */
    var newDegree = degree*clicks;
    var extraDegree = Math.floor(Math.random() * (360 - 1 + 1)) + 1;
    var totalDegree = newDegree+extraDegree;

    $('#wheel').css({
		'transform' : 'rotate(' + totalDegree + 'deg)'      
	});

	$('#wheel').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
		if (wheelStopped == true) {
			showWinner();
		}
    });

    indicatorInterval = setInterval(function () {
		var angle = getRotationDegrees($('#wheel'));

        for (var i=0 ; i < studentsAngles.length ; i++) {
         	if (angle < studentsAngles[i]+1.5+90 && angle > studentsAngles[i]-1.5+90) {
         		$('#indicator').addClass('spin');
            	setTimeout(function () { 
                	$('#indicator').removeClass('spin');
            	}, 50); 
         	}
         }
	},1);
}


function showWinner() {

	clearInterval(indicatorInterval);  
	clearTimeout(timeOut);

	angle = getRotationDegrees($('#wheel'))+90;
	if (angle > 360 ) {
		angle = angle-360;
	}

    if (angle > studentsAngles[0]) {
    	$( ".wheel--winner span" ).text(students[0]);
    	    	$(".wheel--winner").css({"background-color":'#'+colors[0]});

    	    	$('.wheel--winner').click(function() {
    		$('.wheel--winner').hide();
		});
    	$(".wheel--winner").fadeIn(300).css('display','table').delay(4000).fadeOut(300);
    	timeOut = setTimeout(function() {
    $( "#spinButton span" ).fadeIn(300);
}, 5000);

    }
	else {
		for (var j=1 ; j< students.length; j++) {
			if (angle >= studentsAngles[j] && angle < studentsAngles[j-1]) {

    	$( ".wheel--winner span" ).text(students[j]);
    	$(".wheel--winner").css({"background-color":'#'+colors[j]});
    	$('.wheel--winner').click(function() {
    		$('.wheel--winner').hide();
		});
    	$(".wheel--winner").fadeIn(300).css('display','table').delay(4000).fadeOut(300);
    	timeOut = setTimeout(function() {
    $( "#spinButton span" ).fadeIn(300);
}, 5000);

			}
        }
    }
wheelStopped = false;
}


function getRotationDegrees(obj) {

    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else
    	var angle = 0;
    if (angle <= 0)
      return angle+360; 
    else
    	return angle;
}


function resizeCanvasToDisplaySize(canvas) {
   // look up the size the canvas is being displayed
   const width = canvas.clientWidth;
   const height = canvas.clientHeight;

   // If it's resolution does not match change it
   if (canvas.width !== width || canvas.height !== height) {
     canvas.width = width;
     canvas.height = height;
     return true;
   }

   return false;
}