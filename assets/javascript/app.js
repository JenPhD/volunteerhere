//Not exactly sure if the order for all of these things is correct, but I thought I would just 
//start a skeleton with some thoughts about the things we will need.
//LINK TO FIREBASE
	//======================================================================================
	// var config = {

		//}

		//var database = firebase.database();

	//
//SETUP VARIABLES
	//================================================================================
	// var volunteerMatchauthKey = "";
	// var volqueryURLBase = ""; 
	// var homeAwayauthKey = "";
	// var homequeryURLBase = "";
	// var googleFlightsauthKey = "";
	// var flightqueryURLBase = "";
	
	//This array variable will hold the results we get from the user input after
	//adding locations.

	//Featured destinations (Just making these up right now. We can change them)
	// var featureDestinations = ['New York ', 'LA', 'Chicago', 'Orlando', 'Seattle'];
	
//FUNCTIONS
	//==================================================================================
	//First load the inital array of featured destinations.
	//Render the initial panel carousel on window load.
	//Will need a for loop for this.

	// Event listener for added cities. 
	//This function handles events when the user inputs a new city not in our featured destinations

	// $('#addDestination').on('click', function(){

		// This line of code will grab the input from the textbox and trim any extra spaces

		// The city from the textbox is then added to our array with destinations.push

		//Clear the textboxes when done
		
		// We have this line so that users can hit "enter" instead of clicking on the button
		// return false;

		
	// });

	// AJAX calls for flights, home away, and volunteer
	//====================================================================================================
	//Create the queryURL. Use document.body. We need to do this for each API and
	//should be sectioned off, but all within the on click function after the user
	//has filled in destination and trip dates.
		//Add volunteer opportunities

		//Add available flights

		//Add home away availability

		//Storing all of these as properties of the destination and displayed in html trip panel

	// $(document.body).on('click', '.destination', function() {
		//first empty the div with any previous destination/trip information
	   	
		//Split and join replaces the spaces in a destination name with + so the URL works

		//This builds the queryURL with the queryURLBase, the search term, and the authorization key. 
		
		//Use AJAX calls to retrieve the JSON from the APIs

	    	//A variable array of objects returned from the API.

	    		//for loop for the objects in the destinations array.
	     	
	     			//Create a new div for the destination

	     			//Putting the destination and trip information into a nice div/panel		

	// });//ending on-click submit destination button

	//FIREBASE
//===============================================================================
	//Create firebase event for adding and savingtrips to the database and to the 
	//html panel displaying trip information.
	//database.ref().on("child_added", function(childSnapshot, prevChildKey){

	//console.log(childSnapshot.val());

	// Store everything into a variable with childSnapshot.val().
	//Uploads all of the trip information to the database with 
		//database.ref().push({})

	//Add information into a final panel??? that displays all of the trip information


	//});
	

//All of this is a rough outline. Just thoughts of the pieces we will need. Not sure
//where the login code will go in this outline.

//I think this is going to get more complicated as we realize there will be multiple flights at different times.
//We need to think about whether we are going to just display what is available or give users the ability
//to pick flights, pick their volunteer opportunity, and pick their lodging to save as their unique trip
//or whether we are going to just display what is available/possible. But, these were initial thoughts I had.
$(document).ready (function(){
	// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDIB7zQdDc-r5aIEgZoMQGFJliLmJy7hEQ",
    authDomain: "volunteerhere-f345e.firebaseapp.com",
    databaseURL: "https://volunteerhere-f345e.firebaseio.com",
    storageBucket: "volunteerhere-f345e.appspot.com",
  };
  firebase.initializeApp(config);
  var database= firebase.database();

	//made these global so can be accessed anywhere from the script  
	var username;
	var password;
	//has the input boxes hidden initially
	  $('#username').hide();
	  $('#password').hide();
	  $('#submit1').hide(); //refers to the submit for the login section
	  $('#logout').hide();
	  //shows login boxes on click and hides/shows various buttons
	$('#login').on('click', function(){
	  	$('#username').show();
		$('#password').show();
		$('#submit1').show()
		$('#login').hide();
		$('#logout').hide();
		$('#error').html("Invalid username/password").hide();
	});

	//when submit is clicked login boxes hide and Welcom message displays 
	$('#submit1').on('click', function(){
	  	$('#username').hide();
	  	$('#password').hide();
	  	$('#submit1').hide();
	 	
		//gets the values of the users inputs
		username = $('#username').val().trim();
		password = $('#password').val().trim();

		//Welcome message
		$('#welcomeName').html("Welcome, " + username).hide();

		//retrieves the values of username and password
		$('#username').val("");
		$('#password').val("");
		
		//checks to see if username exists
		var nameDoesNotExist = true;
		database.ref().on("value", function(childSnapshot){
			if (childSnapshot.child('username').exists){
					console.log(childSnapshot.val());
					//loops through for each username to check if the password matches 
					childSnapshot.forEach(function(snapshot){
					//only happens if the username exists
					if (username == snapshot.child('username').val()){
						nameDoesNotExist = false;
						//if the password also matches then display welcome message
						if (password === snapshot.child('password').val()){
							console.log(childSnapshot.key)
							$('#welcomeName').show();
							$('#logout').show();
							$('#usersOrigin').val(snapshot.child('origin').val());
							console.log(snapshot.child('origin').val());
							$('#usersDestination').val(snapshot.child('destination').val());
							console.log(snapshot.child('destination').val());
							$('#departingDate').val(snapshot.child('departing').val());
							console.log(snapshot.child('departing').val());
							$('#returningDate').val(snapshot.child('returning').val());
							console.log(snapshot.child('returning').val());
						} else {
							//if password does not match then display error message 
							//and have user try to login in again
							$('#login').show();
							$('#error').show();
						}
					}
				});	
				if (nameDoesNotExist){
					var preKey = database.ref(username).set({
		  			username: username,
		  			password: password
		  			});
		  			var key = preKey.key;
		  			console.log(key);
		  			$('#welcomeName').show();
				}
			} else {
				//if username and password do not exist push to firebase
		  		database.ref(username).set({
		  		//database names and their values 
		  		username: username,
		  		password: password
		  		});
		  		//shows welcome message 
		  		$('#welcomeName').show();
		  	}
		}); 
		//when "save search" is pressed all of the fields are saved to the database
			$('#submit3').on('click', function(){
			database.ref(username).set({
			username: username,
			password: password,
			origin: $('#usersOrigin').val(),
			destination: $('#usersDestination').val(),
			departing: $('#departingDate').val(),
			returning: $('#returningDate').val(),
		}); 	
	});
	//hide everything and saw login for process above to start over	
	$('#logout').on('click', function(){
		$('#login').show();
		$('#logout').hide();
		$('#welcomeName').hide();
		$('#usersOrigin').empty();
		$('#usersDestination').empty();
		$('#departingDate').empty();
		$('#returningDate').empty();

		
	});




});	

 		


});


