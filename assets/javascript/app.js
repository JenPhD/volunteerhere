//FIREBASE=================================================================================
$(document).ready (function(){
	// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDIB7zQdDc-r5aIEgZoMQGFJliLmJy7hEQ",
    authDomain: "volunteerhere-f345e.firebaseapp.com",
    databaseURL: "https://volunteerhere-f345e.firebaseio.com",
    storageBucket: "volunteerhere-f345e.appspot.com",
  };
  firebase.initializeApp(config);
	//sets interval time between each photo
	$('.carousel').carousel({
	  interval: 1000 * 5
	});

	$('#login').on('click', function() {

		//signs in users with an account
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // ...
		});
	});
	
	$('#signup').on('click',function() {
		
		//firebase new user sign up
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // ...
		});
	});
	//allows user to signout
	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	}, function(error) {
	  // An error happened.
	});
});

//SETUP VARIABLES
	//============================================================================================
	var volunteerAPIkey="9560bbac6e597a4e08e3d82094ba5da2";
	// authentication headers for API requests
	var authenticationHeaders = {
  		"X-WSSE": volunteerAPIkey,
  		"Authorization": "WSSE profile='\ VolunteerHere\'" 
	}

	var queryURLBase = "http://www.volunteermatch.org/api/call?action=searchOpportunities";
	
	var testParameters = {
    "location": "mountain view, ca",
        "opportunityTypes": ["public", "private"]
	};

	// metaData for the API Key/site
	var metaData = null;
	//This array variable will hold the results we get from the user input after
	//adding a location with the submit button.
	
	//Featured destinations (Just making these up right now. We can change them)
	var featureDestinations = ['NYC', 'LA', 'Chicago', 'Austin', 'WDC'];

	// we will use CORS headers to facilitate certain cross-domain requests (from JSFiddle only)
	jQuery.support.cors = true;

//FUNCTIONS
	//=================================================================================================
///This is just getting a response from Volunteer Match. Need to change the button names to match with HTML
	//Create the query URL based on the chosen destination, either a feature destination
	//or a destination they have added through a different destination pushed to our array.
	//using document.body in case there are any scope problems

	$(document.body).on('click', '#submitCity', function() {
  		//First adding to array if it is a new city not in the carousel.
  		// This line of code will grab the input from the textbox and trim any extra spaces
		//var newCity = $('#city-input').val().trim();
		//console.log(newCity);

		// The city from the textbox is then added to our array
		//featureDestinations.push(newCity);

		//Clear the textbox when done
		$('#cityinput').val(" ");
	
  		//first empty the div with any previous search results
  		//$('#tripresults').empty();
  		//Create a variable that is the search term, which is the name of the destination city
  		//replace spaces in city names with a plus sign for a search
  		//var searchTerm = $(this).data('.submitCity').split(' ').join('+');

  		//Build the queryURL with the query with the query URL base and the search terms
  		//(the city destination and trip dates)

  		var queryURL = queryURLBase + "&key=" + volunteerAPIkey + "&query=" + JSON.stringify(testParameters);
  		console.log("about to AJAX");

  		//GET function to retrieve information about the volunteer opportunities from the volunteer match API
  		//with an AJAX call
  		$.ajax({url: queryURL, method: 'GET'})
		.done(function(reponse) {
		console.log(response);
			
			//Make a variable that stores the JSON from the volunteer match API
			//var volMatch = response.data;
			//console.log(volMatch)


				//For loop for the city in the cities array.
	    		//for (var j = 0; j < volMatch.length; j++) {
	     	
	     			//Create a new div for all of the trip data

	     			//var trip = $('<div class="tripDiv">');
					
	     			//Add the volunteer opportunities, the google flights, the google hotels
	      			//var volunteer = $('<p>').text("Here are your volunteer matches" + volMatch[j].whateverdata);
	     			//console.log(volunteer);

	     			//var flights = 

	     			//var hotels = 

	     			//Maybe get a nice image or gif to give trip itnerary some city visuals

	    //  			var cityImages = $('<img>')
	    //  			.addClass('cityimg');
	     		
	    //  			tripDiv.prepend(volunteer);
	    //  			tripDiv.prepend(cityImages);
	    //  			tripDiv.prepend(flights);
	    //  			tripDiv.prepend(hotels);
	    //  		}
	    });	
	    // We have this line so that users can hit "enter" instead of clicking on the button
		return false;
	});
