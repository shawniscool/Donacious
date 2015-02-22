var states = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];

$(function(){
	// alert("aaa");
	Parse.initialize("GwdN8Kf6cSteivzdHgNoxwR6kKZucoWnKOd0dXKr", "aZMBOI6U6P6wJFBzvpVDAlsSaQUzqNpMfTrMBWEM");
	// alert("aaa");
	var currentUser = Parse.User.current();
	// if (currentUser){
	// 	$("#content").append("Hello " + currentUser.get("username"));
	// 	console.log(currentUser.get("username"));
	// }
	// else{
	// 	$("#content").append("No one is logged in");
	// }
	// alert("current user is " + currentUser);
	// $("#content").append("Hello " + currentUser.get("username"));
	// console.log(currentUser.get("username"));
	// $("#content").append("aa");
	$("#sign-up-button").leanModal({top : 50, overlay : 0.7, closeButton: ".modal_close"});
	$("#log-in-button").leanModal({top : 50, overlay : 0.7, closeButton: ".modal_close"});

	initialize();
	// $("#go").leanModal();
});

function initialize(){
	console.log("initialize function");
	var option;
	option = document.createElement("option");
	console.log("for loop");
	// for (i = 0; i < states.length; i ++){
	// 	console.log(states[i]);
	// 	// option.text = states[i];
	// 	$("#state").append('<option>' + states[i] + '</option>');
	// }
	console.log("after for loop");
	// alert("in the initialize function");
	$("#log-out-button").on('click',function(e){
		console.log("in logout");
		e.preventDefault();
		Parse.User.logOut();
		location.reload();
		console.log("logged out here");
	});
	$("#signup").on('click',function(e){
		e.preventDefault();
		username = $('#username').val();
		password = $('#password').val();
		email = $('#email').val()
		address = $('#address').val()
		city = $('#city').val()
		state = $('#state').val()
		zipcode = $('#zipcode').val()
		
		if (username == '' || password == '' || email == ''){
			alert("Please complete all fields");
			return;
		}
		createNewUser(username,password,email, address, city, state, zipcode);
	});
	$("#login").on('click',function(e){
		e.preventDefault();
		username = $('#loginusername').val();
		password = $('#loginpassword').val();
		if (username == '' || password == ''){
			alert("Please complete all fields");
			return;
		}
		Parse.User.logIn(username,password,{
			success: function(username){
				alert("successfully logged in");
				location.reload();
			},
			error: function(user,error){
				alert("Error: " + error.code + " " + error.message);
			}
		});
	});
	$("#forgot").on('click',function(e){
		e.preventDefault();
		// console.log("forgotemail value is " + $('#forgotemail').val());
		Parse.User.requestPasswordReset($('#forgotemail').val(), {
		  success: function() {
		  	alert("Please check your email to see password reset page");
		    // Password reset request was sent successfully
		  },
		  error: function(error) {
		    // Show the error message somewhere
		    alert("Error: " + error.code + " " + error.message);
		  }
		});
	});
	checkCurrentUser();
	findQuery();
}

// This function checks if the current user is logged in
function checkCurrentUser(){
	var currentUser = Parse.User.current();
	if (currentUser){
		console.log("current user is logged in");
		$('#log-in-button').hide();
		$('#sign-up-button').hide();
	}else{
		$('#log-out-button').hide();
		$('#create-campaign-button').hide();
	}
}

// This function is used to create new user object in the parse app
function createNewUser(username, passw, email, address, city, state, zipcode){
	var user = new Parse.User();
	user.set("username",username);
	user.set("password",passw);
	user.set("email",email);
	user.set("address",address);
	user.set("city",city);
	user.set("state",state);
	user.set("zipcode",zipcode);
	user.signUp(null,{
		success: function(user){
			alert("This user is registered!");
			// user.destroy();
		},
		error: function(user,error){
			alert("Error: " + error.code + " " + error.message);
			user.destroy();
		}
	});
}

function findQuery(){
	var campaigns = Parse.Object.extend("Campaign");
	var queries = new Parse.Query(campaigns);
	queries.find({
		error: function(error){
			alert("Error: " + error.code +error.message);
		}
	});
	queries.find().then(function(results){
		$('#content').append(makeList(results));
	});
}

// This is the function that reads the queries results and creates HTML elements to 
//  append to the main page
function makeList(results){
	var text = 0, description, name, location;
	for (var i = 0; i < results.length; i++){
		name = results[i].get("name");
		console.log("name is " + name);
		description = results[i].get("description");
		location = results[i].get('city') + "," + results[i].get('state');
		console.log("description is " + description);
		console.log("location is " + location);

		text += "<div class = 'caption' data-description = '" + description;
		text += "'><p class='title'><span class= 'text'> " + name;
		text += "</span><br><span class= 'location'>" + location + "</span></p>"
		text += "<img src = 'images/2.jpg' /> </div>"
	}
	return text;

}
