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

	// metaData for the API Key/site
	var metaData = null;
	//This array variable will hold the results we get from the user input after
	//adding a location with the submit button.
	
	//Featured destinations (Just making these up right now. We can change them)
	var featureDestinations = ['New York City, NY', 'Los Angeles, CA', 'Chicago, IL', 'Austin, TX', 'Washington DC'];

	// we will use CORS headers to facilitate certain cross-domain requests
	jQuery.support.cors = true;

//FUNCTIONS
	//=================================================================================================
	//Create the query URL based on the chosen destination.
	//using document.body in case there are any scope problems
	//Functions for feature destinations in carousel
	//NYC

	$(document.body).on('click', '#NYC', function() {
  		//Creating a search object as specified in Volunteer Match docs
  		//returns volunteer opportunities in the clicked on feature destination
		var volSearch = {
   		"location": "New York City, NY",
        "opportunityTypes": ["public", "private"], 
        "fieldsToDisplay": ["imageURL", "name", "url", "contact", "location", "endDate", "description", "vmUrl"]
	 	};
	
  		//first empty the div with any previous search results
  		$('#volResults').empty();

  		//Build the queryURL with the query URL base and the search terms -- the destination (and trip dates?)

  		var queryURL = queryURLBase + "&key=" + volunteerAPIkey + "&query=" + JSON.stringify(volSearch);
  		console.log("about to AJAX");

  			//GET function to retrieve information about the volunteer opportunities from the volunteer match API
  			//with an AJAX call
  			$.ajax({url: queryURL, method: 'GET'})
			.done(function(response) {
			
			//Make a variable that stores the JSON from the volunteer match API
			var volMatch = response;
			console.log(volMatch);
				
		});
	});

	//AUSTIN

	$(document.body).on('click', '#AUSTIN', function() {
		//Creating a search object as specified in Volunteer Match docs
  		//returns volunteer opportunities in the clicked on feature destination
		var volSearch = {
   		"location": "Austin, TX",
        "opportunityTypes": ["public", "private"],
        "fieldsToDisplay": ["imageURL", "name", "url", "contact", "location", "endDate", "description", "vmUrl"]
	 	};
	
  		//first empty the div with any previous search results
  		$('#volResults').empty();

  		//Build the queryURL with the query URL base and the search terms -- (the destination and trip dates)

  		var queryURL = queryURLBase + "&key=" + volunteerAPIkey + "&query=" + JSON.stringify(volSearch);
  		console.log("about to AJAX");

  			//GET function to retrieve information about the volunteer opportunities from the volunteer match API
  			//with an AJAX call
  			$.ajax({url: queryURL, method: 'GET'})
			.done(function(response) {
			
			//Make a variable that stores the JSON from the volunteer match API
			var volMatch = response;
			console.log(volMatch);
				
		});
	});

	//WASHINGTON DC

	$(document.body).on('click', '#WDC', function() {
		//Creating a search object as specified in Volunteer Match docs
  		//returns volunteer opportunities in the clicked on feature destination
		var volSearch = {
   		"location": "Washington DC",
        "opportunityTypes": ["public", "private"],
        "fieldsToDisplay": ["imageURL", "name", "url", "contact", "location", "endDate", "description", "vmUrl"]
	 	};
	
  		//first empty the div with any previous search results
  		$('#volResults').empty();

  		//Build the queryURL with the query URL base and the search terms -- (the destination and trip dates)

  		var queryURL = queryURLBase + "&key=" + volunteerAPIkey + "&query=" + JSON.stringify(volSearch);
  		console.log("about to AJAX");

  			//GET function to retrieve information about the volunteer opportunities from the volunteer match API
  			//with an AJAX call
  			$.ajax({url: queryURL, method: 'GET'})
			.done(function(response) {
			
			//Make a variable that stores the JSON from the volunteer match API
			var volMatch = response;
			console.log(volMatch);
				
		});
	});

	//AUSTIN

	$(document.body).on('click', '#LA', function() {
		//Creating a search object as specified in Volunteer Match docs
  		//returns volunteer opportunities in the clicked on feature destination
		var volSearch = {
   		"location": "Los Angeles, CA",
        "opportunityTypes": ["public", "private"],
        "fieldsToDisplay": ["imageURL", "name", "url", "contact", "location", "endDate", "description", "vmUrl"]
	 	};
	
  		//first empty the div with any previous search results
  		$('#volResults').empty();

  		//Build the queryURL with the query URL base and the search terms -- (the destination and trip dates)

  		var queryURL = queryURLBase + "&key=" + volunteerAPIkey + "&query=" + JSON.stringify(volSearch);
  		console.log("about to AJAX");

  			//GET function to retrieve information about the volunteer opportunities from the volunteer match API
  			//with an AJAX call
  			$.ajax({url: queryURL, method: 'GET'})
			.done(function(response) {
			
			//Make a variable that stores the JSON from the volunteer match API
			var volMatch = response;
			console.log(volMatch);
				
		});
	});

	//CHICAGO

	$(document.body).on('click', '#CHICAGO', function() {
		//Creating a search object as specified in Volunteer Match docs
  		//returns volunteer opportunities in the clicked on feature destination
		var volSearch = {
   		"location": "Chicago, IL",
        "opportunityTypes": ["public", "private"],
        "fieldsToDisplay": ["imageURL", "name", "url", "contact", "location", "endDate", "description", "vmUrl"]
	 	};
	
  		//first empty the div with any previous search results
  		$('#volResults').empty();

  		//Build the queryURL with the query URL base and the search terms -- (the destination and trip dates)

  		var queryURL = queryURLBase + "&key=" + volunteerAPIkey + "&query=" + JSON.stringify(volSearch);
  		console.log("about to AJAX");

  			//GET function to retrieve information about the volunteer opportunities from the volunteer match API
  			//with an AJAX call
  			$.ajax({url: queryURL, method: 'GET'})
			.done(function(response) {
			
			//Make a variable that stores the JSON from the volunteer match API
			var volMatch = response;
			console.log(volMatch);
				
		});
	});

	//Create the query URL based on a user destination not in featured destinations.
	//Added in usersDestination, pushed to our array.
	//using document.body in case there are any scope problems

	$(document.body).on('click', '#submitCity', function() {
  		//First adding to array if it is a new city not in the carousel.
  		// This line of code will grab the input from the textbox and trim any extra spaces

  		var newCity = $('#usersDestination').val().trim();
		
		var volSearch = {
   		"location": newCity,
        "opportunityTypes": ["public", "private"],
        "fieldsToDisplay": ["imageURL", "name", "url", "contact", "location", "endDate", "description", "vmUrl"]
	 	};

		// The city from the textbox is then added to our array
		featureDestinations.push(volSearch.location);
	
  		//first empty the div with any previous search results
  		$('#volResults').empty();
  		
  		//Build the queryURL with the query URL base and the search terms --the destination (and trip dates?)

  		var queryURL = queryURLBase + "&key=" + volunteerAPIkey + "&query=" + JSON.stringify(volSearch);
  		console.log("about to AJAX");

  		//GET function to retrieve information about the volunteer opportunities from the volunteer match API
  		//with an AJAX call
  		$.ajax({url: queryURL, method: 'GET'})
		.done(function(response) {
			
			//Make a variable that stores the JSON from the volunteer match API
			var volMatch = response.opportunities;
			console.log(volMatch);


				//For loop for the city in the volunteer opportunities array.
	    		for (var j = 0; j < volMatch.length; j++) {
	     	
	     			//Create a new div for the volunteer opportunities

	     			var tripDiv = $('<div class="trip">');
					
	     			//Add the volunteer opportunities

	     			//First adding end date, results should display in ascending order
	     			var endingDate = $('<span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>').html(volMatch[j].endDate);
	     			//Adding organization name
	      			var orgName = $('<p class="volOrgName">').text(volMatch[j].parentOrg.name);
	     			//console.log(orgName);

	     			//Docs say there are images available, but I don't see one in the response
	     			var imgURL = $('<img>')
	     			.addClass('volImage')
	     			.attr('src', volMatch[j].imageURL);

	     			//Adding description

	     			var orgDescription = $('<p class="volDescription">').text(volMatch[j].description);

	     			//Adding location
	     			var loc = $('<p class="volLocation">').text(volMatch[j].location);

	     			//Docs say there is contact info available, but I don't see one in the response

	     			var contactOrg = $('<p class="volContact">').text(volMatch[j].contact);

	     			//Organization URL

	     			var orgURL = $('<a href="Website">').html(volMatch[j].url);

	     			//Volunteer Match URL

	     			var matchURL = $('<a href="Volunteer Match">').html(volMatch[j].vmUrl);

	     			//var flights = 

	     			//var hotels = 
	     			
	     			tripDiv.append(endingDate);
	 	 			tripDiv.append(orgName);
	 	 			tripDiv.append(imgURL);
	 	 			tripDiv.append(orgDescription);
	 	 			tripDiv.append(loc);
	 	 			tripDiv.append(contactOrg);
	 	 			tripDiv.append(orgURL);
	 	 			tripDiv.append(matchURL);
	    //  			tripDiv.prepend(cityImages);
	    //  			tripDiv.prepend(flights);
	    //  			tripDiv.prepend(hotels);

	    			//Appending tripDiv to volResults
	    			$('#volResults').prepend(tripDiv);
	    		}
	    	//Clear the textboxes when done
			$('#usersOrigin').val(" ");
			$('#usersDestination').val(" ");
	    });	
	    // We have this line so that users can hit "enter" instead of clicking on the button
		return false;
	});



  


  
