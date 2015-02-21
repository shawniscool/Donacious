var states = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];

$(function(){
	// alert("aaa");
	Parse.initialize("GwdN8Kf6cSteivzdHgNoxwR6kKZucoWnKOd0dXKr", "aZMBOI6U6P6wJFBzvpVDAlsSaQUzqNpMfTrMBWEM");
	// alert("aaa");
	var currentUser = Parse.User.current();
	if (currentUser){
		$("#content").append("Hello " + currentUser.get("username"));
		console.log(currentUser.get("username"));
	}
	else{
		$("#content").append("No one is logged in");
	}
	// alert("current user is " + currentUser);
	// $("#content").append("Hello " + currentUser.get("username"));
	// console.log(currentUser.get("username"));
	$("#content").append("aa");
	initialize();
	console.log("after initialize function");
});

function initialize(){
	console.log("initialize function");
	var option;
	option = document.createElement("option");
	console.log("for loop");
	for (i = 0; i < states.length; i ++){
		console.log(states[i]);
		// option.text = states[i];
		$("#state").append('<option>' + states[i] + '</option>');
	}

	console.log("after for loop");
	// alert("in the initialize function");
	$("#logout").on('click',function(e){
		console.log("in logout");
		e.preventDefault();
		Parse.User.logOut();
		location.reload();

	});
	$("#signup").on('click',function(e){
		e.preventDefault;
		username = $('#signupusername').val();
		password = $('#signuppassword').val();
		email = $('#signupemail').val()
		if (username == '' || password == '' || email == ''){
			alert("Please complete all fields");
			return;
		}
		createNewUser(username,password,email);
		// console.log(userName);
		// alert(userName);
	});
	$("#signin").on('click',function(e){
		e.preventDefault();
		username = $('#signinusername').val();
		password = $('#signinpassword').val();
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
				// alert("log in failed")
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
}

function createNewUser(username, passw, email){
	var user = new Parse.User();
	user.set("username",username);
	user.set("password",passw);
	user.set("email",email);
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

